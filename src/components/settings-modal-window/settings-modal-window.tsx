import { FaTimes } from 'react-icons/fa';

type SettingsModalWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  toggles: { [key: string]: boolean };
  onToggleChange: (id: string) => void;
};

type CheckboxOption = {
  id: string;
  label: string;
};

const options: CheckboxOption[] = [
  { id: 'feelsLike', label: 'Display "Feels Like"' },
  { id: 'humidity', label: 'Display "Humidity"' },
  { id: 'sunrise', label: 'Display "Sunrise/sunset"' },
];

function SettingsModalWindow({ isOpen, onClose, toggles, onToggleChange }: SettingsModalWindowProps) {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 p-1"
        >
          <FaTimes className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Settings</h2>
        <div className="flex flex-col gap-6">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between w-full"
            >
              <span className="text-gray-700 font-medium">{option.label}</span>
              <div
                onClick={() => onToggleChange(option.id)}
                className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all ${
                  toggles[option.id] ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    toggles[option.id] ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingsModalWindow;
