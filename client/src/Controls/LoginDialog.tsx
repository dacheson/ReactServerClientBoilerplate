import React, { Component } from "react";
import { observer } from "mobx-react";
import Identicon from "react-identicons";
import { useInput } from "./../useState";
import { render } from "react-dom";

export interface ILoginDialogProps {
  /** List of the current active users */
  readonly logIn: (username: string) => void;
}

export default observer(function LoginDialog(props: ILoginDialogProps) {
  const {
    value: userName,
    bind: binduserName,
    reset: resetuserName,
  } = useInput("");

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    const username = userName;
    if (username) {
      props.logIn(username);
    }
    resetuserName();
  };

  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <Identicon
              className="account__avatar"
              size={64}
              string="randomness"
            />
            <p className="account__name">Welcome player!</p>
            <p className="account__sub">Enter your name to play</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              className="form-control"
              {...binduserName}
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary account__btn"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});
