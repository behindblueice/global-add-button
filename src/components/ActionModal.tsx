
import React from 'react';
import Modal from './Modal';
import { ChevronRight, Moon, Clipboard, Utensils, CheckCircle } from 'lucide-react';

interface Action {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actions: Action[];
  onActionSelect: (action: Action) => void;
}

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  actions,
  onActionSelect
}) => {
  return (
    <Modal
      title="Choose what to do"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-2">
        {actions.map((action) => (
          <button
            key={action.id}
            className="action-button"
            onClick={() => onActionSelect(action)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                {action.icon}
              </div>
              <div className="text-left">
                <div className="font-medium">{action.name}</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default ActionModal;
