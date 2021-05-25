import React from "react";

export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal-popup">
      <div>{props.children}</div>
    </div>
  );
}
