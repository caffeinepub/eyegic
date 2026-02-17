import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RepairType } from '@/backend';

interface RepairIssueTypeMultiSelectProps {
  selectedTypes: RepairType[];
  onChange: (types: RepairType[]) => void;
  disabled?: boolean;
}

const repairTypeOptions = [
  { value: RepairType.adjustment, label: 'Adjustment' },
  { value: RepairType.screwTightening, label: 'Screw Tightening' },
  { value: RepairType.lensReplacement, label: 'Lens Replacement' },
  { value: RepairType.other, label: 'Other' },
];

export default function RepairIssueTypeMultiSelect({
  selectedTypes,
  onChange,
  disabled,
}: RepairIssueTypeMultiSelectProps) {
  const handleToggle = (type: RepairType) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter((t) => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">
        Issue Type <span className="text-muted-foreground font-normal">(Optional)</span>
      </Label>
      <div className="space-y-2">
        {repairTypeOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`repair-type-${option.value}`}
              checked={selectedTypes.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
              disabled={disabled}
            />
            <Label
              htmlFor={`repair-type-${option.value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
