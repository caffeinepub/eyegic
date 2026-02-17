import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FrameShape } from '../../backend';
import {
  AviatorIcon,
  CatEyeIcon,
  HexagonIcon,
  OvalIcon,
  RectangleIcon,
  RoundIcon,
  SquareIcon,
  WayfarerIcon,
  WraparoundIcon,
} from './FrameShapeIcons';

interface FrameShapePickerProps {
  selected: FrameShape[];
  onChange: (shapes: FrameShape[]) => void;
}

const frameShapeOptions = [
  { value: FrameShape.aviator, label: 'Aviator', Icon: AviatorIcon },
  { value: FrameShape.catEye, label: 'Cat Eye', Icon: CatEyeIcon },
  { value: 'hexagonal' as any, label: 'Hexagon/Geometrical', Icon: HexagonIcon },
  { value: FrameShape.oval, label: 'Oval', Icon: OvalIcon },
  { value: FrameShape.rectangular, label: 'Rectangle', Icon: RectangleIcon },
  { value: FrameShape.round, label: 'Round', Icon: RoundIcon },
  { value: FrameShape.square, label: 'Square', Icon: SquareIcon },
  { value: FrameShape.wayfarer, label: 'Wayfarer', Icon: WayfarerIcon },
  { value: 'wraparound' as any, label: 'Wraparound', Icon: WraparoundIcon },
];

export default function FrameShapePicker({ selected, onChange }: FrameShapePickerProps) {
  const handleToggle = (shape: FrameShape) => {
    if (selected.includes(shape)) {
      onChange(selected.filter(s => s !== shape));
    } else {
      onChange([...selected, shape]);
    }
  };

  return (
    <div className="space-y-3">
      {frameShapeOptions.map(({ value, label, Icon }) => (
        <div key={value} className="flex items-center space-x-3">
          <Checkbox
            id={`shape-${value}`}
            checked={selected.includes(value)}
            onCheckedChange={() => handleToggle(value)}
          />
          <Label
            htmlFor={`shape-${value}`}
            className="flex items-center gap-2 font-normal cursor-pointer"
          >
            <Icon className="h-5 w-5 text-muted-foreground" />
            <span>{label}</span>
          </Label>
        </div>
      ))}
    </div>
  );
}
