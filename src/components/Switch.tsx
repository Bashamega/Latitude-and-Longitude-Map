import { useState } from 'react';

interface SwitchProps {
  enabled: boolean;
  onChange?: (isChecked: boolean) => void;
  header: string;
  description: string;
}

const Switch: React.FC<SwitchProps> = ({ enabled, onChange, header, description }) => {
  const [isChecked, setIsChecked] = useState(enabled);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };

  return (
    <div className="mb-4">
      
      <label className="flex space-x-2 items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="hidden"
            checked={isChecked}
            onChange={toggleSwitch}
          />
          <div className="toggle__line w-20 h-10 bg-gray-400 rounded-full shadow-inner"></div>
          <div
            className={`toggle__dot absolute w-10 h-10 bg-white rounded-full inset-y-0 left-0 shadow-lg ${
              isChecked ? 'translate-x-full bg-green-500' : 'bg-white'
            }`}
          ></div>
        </div>
        <div className=" items-center mb-2">
          <h2 className="mr-2 font-semibold">{header}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
      </label>
      
    </div>
  );
};

export default Switch;
