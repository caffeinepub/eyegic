import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

interface AvailabilitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AvailabilitySelector({ value, onChange }: AvailabilitySelectorProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [fromTime, setFromTime] = useState('09:00');
  const [toTime, setToTime] = useState('17:00');
  const [mode, setMode] = useState<'single' | 'range'>('single');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (mode === 'single') {
      const dateExists = selectedDates.some(d => d.getTime() === date.getTime());
      
      if (dateExists) {
        setSelectedDates(selectedDates.filter(d => d.getTime() !== date.getTime()));
      } else {
        setSelectedDates([...selectedDates, date]);
      }
    }
    
    updateValue();
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    updateValue();
  };

  const updateValue = () => {
    setTimeout(() => {
      let dateStr = '';
      
      if (mode === 'single' && selectedDates.length > 0) {
        const sortedDates = [...selectedDates].sort((a, b) => a.getTime() - b.getTime());
        dateStr = sortedDates.map(d => format(d, 'MMM dd, yyyy')).join(', ');
      } else if (mode === 'range' && dateRange?.from) {
        if (dateRange.to) {
          dateStr = `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`;
        } else {
          dateStr = format(dateRange.from, 'MMM dd, yyyy');
        }
      }
      
      if (dateStr) {
        onChange(`${dateStr} | ${fromTime} - ${toTime}`);
      }
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === 'single' ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            setMode('single');
            setDateRange(undefined);
          }}
        >
          Select Dates
        </Button>
        <Button
          type="button"
          variant={mode === 'range' ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            setMode('range');
            setSelectedDates([]);
          }}
        >
          Select Range
        </Button>
      </div>

      {mode === 'single' ? (
        <Calendar
          mode="single"
          selected={selectedDates[selectedDates.length - 1]}
          onSelect={handleDateSelect}
          disabled={(date) => date < today}
          className="rounded-md border"
        />
      ) : (
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleRangeSelect}
          disabled={(date) => date < today}
          className="rounded-md border"
        />
      )}

      {selectedDates.length > 0 && mode === 'single' && (
        <div className="text-sm">
          <span className="font-medium">Selected dates:</span>{' '}
          <span className="text-muted-foreground">
            {selectedDates.map(d => format(d, 'MMM dd')).join(', ')}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fromTime">From Time</Label>
          <Input
            id="fromTime"
            type="time"
            value={fromTime}
            onChange={(e) => {
              setFromTime(e.target.value);
              updateValue();
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="toTime">To Time</Label>
          <Input
            id="toTime"
            type="time"
            value={toTime}
            onChange={(e) => {
              setToTime(e.target.value);
              updateValue();
            }}
          />
        </div>
      </div>
    </div>
  );
}
