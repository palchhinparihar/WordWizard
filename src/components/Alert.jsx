import React from "react";
import { capitalize } from "../utils";

const Alert = ({ alert }) => {
  const getAlertClasses = (type) => {
    const baseClasses = "px-4 py-2 rounded-md border-l-4 font-medium";
    switch (type) {
      case "success":
        return `${baseClasses} bg-green-50 border-green-400 text-green-700`;
      case "warning":
        return `${baseClasses} bg-yellow-50 border-yellow-400 text-yellow-700`;
      case "danger":
        return `${baseClasses} bg-red-50 border-red-400 text-red-700`;
      default:
        return `${baseClasses} bg-blue-50 border-blue-400 text-blue-700`;
    }
  };

  return (
    <div data-aos="fade-up" className="h-10">
      {alert && (
        <div className={getAlertClasses(alert.type)} role="alert">
          <span>
            <strong>{capitalize(alert.type)}</strong> : {alert.msg}
          </span>
        </div>
      )}
    </div>
  );
};

export default Alert;
