import React from "react";
import { confirmAlert } from "react-confirm-alert";

const ConfirmationDialog = {
  showWithNavigation: ({
    title,
    message,
    navigateTo,
    navigate,
    confirmLabel = "Ya, Batal",
    cancelLabel = "Tetap di Halaman",
  }) => {
    confirmAlert({
      title,
      message,
      buttons: [
        {
          label: confirmLabel,
          onClick: () => {
            navigate({ to: navigateTo });
          },
          className: "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700",
        },
        {
          label: cancelLabel,
          onClick: () => {
            // Do nothing
          },
          className:
            "bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 ml-2",
        },
      ],
      customUI: ({ onClose, title, message, buttons }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <div className="mb-6">
              <p className="text-gray-600">{message}</p>
            </div>
            <div className="flex justify-end">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className={button.className}
                  onClick={() => {
                    button.onClick();
                    onClose();
                  }}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    });
  },

  showWithAction: ({
    title,
    message,
    onConfirm,
    confirmLabel = "Ya",
    cancelLabel = "Batal",
    confirmClassName = "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700",
  }) => {
    confirmAlert({
      title,
      message,
      buttons: [
        {
          label: confirmLabel,
          onClick: onConfirm,
          className: confirmClassName,
        },
        {
          label: cancelLabel,
          onClick: () => {
            // Do nothing
          },
          className:
            "bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 ml-2",
        },
      ],
      customUI: ({ onClose, title, message, buttons }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <div className="mb-6">
              <p className="text-gray-600">{message}</p>
            </div>
            <div className="flex justify-end">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className={button.className}
                  onClick={() => {
                    button.onClick();
                    onClose();
                  }}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    });
  },
};

export default ConfirmationDialog;
