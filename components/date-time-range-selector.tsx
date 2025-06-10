/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { ArrowRightIcon, CalendarIcon, ClockIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DateTimeRangeData = {
  fromDate?: Date
  fromTime?: string
  toDate?: Date
  toTime?: string
}

function DateTimeRangeSelector() {
  const [dateTimeRange, setDateTimeRange] = React.useState<DateTimeRangeData>(
    {}
  )
  const [openFromDate, setOpenFromDate] = React.useState(false)
  const [openFromTime, setOpenFromTime] = React.useState(false)
  const [openToDate, setOpenToDate] = React.useState(false)
  const [openToTime, setOpenToTime] = React.useState(false)

  const handleSequentialPopover = (currentStep: string, value: any) => {
    switch (currentStep) {
      case "fromDate":
        setDateTimeRange((prev) => ({
          ...prev,
          fromDate: value,
          toDate: undefined, // Reset 'To' date and time
          toTime: "",
        }))
        setOpenFromDate(false)
        setOpenFromTime(true)
        break
      case "fromTime":
        setDateTimeRange((prev) => ({
          ...prev,
          fromTime: value,
          toDate: undefined, // Reset 'To' date and time
          toTime: "",
        }))
        setOpenFromTime(false)
        setOpenToDate(true)
        break
      case "toDate":
        setDateTimeRange((prev) => ({ ...prev, toDate: value }))
        setOpenToDate(false)
        setOpenToTime(true)
        break
      case "toTime":
        setDateTimeRange((prev) => ({ ...prev, toTime: value }))
        setOpenToTime(false)
        break
    }
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select date"
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const generateTimeSlots = (isToTimeSlot: boolean = false) => {
    const slots = []
    for (let hour = 8; hour <= 21; hour++) {
      // 8 AM to 9 PM
      const isPM = hour >= 12
      const displayHour = hour > 12 ? hour - 12 : hour
      const meridiem = isPM ? "PM" : "AM"

      slots.push({
        value: `${hour.toString().padStart(2, "0")}:00`,
        label: `${displayHour}:00 ${meridiem}`,
      })

      if (isToTimeSlot || hour !== 21) {
        // Add 9:30 PM only for 'To' time or if not 9 PM
        slots.push({
          value: `${hour.toString().padStart(2, "0")}:30`,
          label: `${displayHour}:30 ${meridiem}`,
        })
      }
    }

    if (isToTimeSlot && dateTimeRange.fromDate && dateTimeRange.toDate) {
      const isSameDay =
        dateTimeRange.fromDate.toDateString() ===
        dateTimeRange.toDate.toDateString()

      if (isSameDay && dateTimeRange.fromTime) {
        return slots.filter((slot) => slot.value > dateTimeRange.fromTime!)
      }
    }
    return slots
  }

  const validateFilters = (): { isValid: boolean; message: string } => {
    if (!dateTimeRange.fromDate) {
      return { isValid: false, message: "Please select 'From' date" }
    }
    if (!dateTimeRange.fromTime) {
      return { isValid: false, message: "Please select 'From' time" }
    }
    if (!dateTimeRange.toDate) {
      return { isValid: false, message: "Please select 'To' date" }
    }
    if (!dateTimeRange.toTime) {
      return { isValid: false, message: "Please select 'To' time" }
    }
    return { isValid: true, message: "" }
  }

  const handleSearch = () => {
    const { isValid, message } = validateFilters()

    if (!isValid) {
      toast("Incomplete selection", {
        description: message,
      })
      return
    }

    toast("Selected range", {
      description: JSON.stringify(dateTimeRange),
    })
  }

  return (
    <div className="min-w-sm space-y-4">
      {/* From Section */}
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">From</p>
        <div className="flex">
          <Popover open={openFromDate} onOpenChange={setOpenFromDate}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-10 flex-1 justify-start gap-0 rounded-r-none border-r-0 font-normal",
                  !dateTimeRange.fromDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(dateTimeRange.fromDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateTimeRange.fromDate}
                onSelect={(date) => handleSequentialPopover("fromDate", date)}
                disabled={(date) => date < today}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover open={openFromTime} onOpenChange={setOpenFromTime}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-10 flex-1 justify-start gap-0 rounded-l-none",
                  !dateTimeRange.fromTime && "text-muted-foreground"
                )}
              >
                <ClockIcon className="mr-2 h-4 w-4" />
                {dateTimeRange.fromTime
                  ? generateTimeSlots().find(
                      (slot) => slot.value === dateTimeRange.fromTime
                    )?.label
                  : "Select time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              asChild
              className="w-[var(--radix-popover-trigger-width)] p-0"
            >
              <Command>
                <CommandList>
                  <CommandEmpty>No time slots available.</CommandEmpty>
                  <CommandGroup>
                    {generateTimeSlots().map((slot) => (
                      <CommandItem
                        key={`from-${slot.value}`}
                        value={slot.value}
                        onSelect={(value) =>
                          handleSequentialPopover("fromTime", value)
                        }
                      >
                        {slot.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* To Section */}
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">To</p>
        <div className="flex">
          <Popover open={openToDate} onOpenChange={setOpenToDate}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-10 flex-1 justify-start gap-0 rounded-r-none border-r-0 font-normal",
                  !dateTimeRange.toDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(dateTimeRange.toDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateTimeRange.toDate}
                onSelect={(date) => handleSequentialPopover("toDate", date)}
                disabled={(date) => {
                  const fromDate = dateTimeRange.fromDate
                  if (!fromDate) return date < today
                  // Disable dates before fromDate or before today
                  return date < fromDate || date < today
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover open={openToTime} onOpenChange={setOpenToTime}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-10 flex-1 justify-start gap-0 rounded-l-none",
                  !dateTimeRange.toTime && "text-muted-foreground"
                )}
              >
                <ClockIcon className="mr-2 h-4 w-4" />
                {dateTimeRange.toTime
                  ? generateTimeSlots(true).find(
                      (slot) => slot.value === dateTimeRange.toTime
                    )?.label
                  : "Select time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              asChild
              className="w-[var(--radix-popover-trigger-width)] p-0"
            >
              <Command>
                <CommandList>
                  <CommandEmpty>No time slots available.</CommandEmpty>
                  <CommandGroup>
                    {generateTimeSlots(true).map((slot) => (
                      <CommandItem
                        key={`to-${slot.value}`}
                        value={slot.value}
                        onSelect={(value) =>
                          handleSequentialPopover("toTime", value)
                        }
                      >
                        {slot.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button className="mt-4 w-full" onClick={handleSearch}>
        Search
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default DateTimeRangeSelector
