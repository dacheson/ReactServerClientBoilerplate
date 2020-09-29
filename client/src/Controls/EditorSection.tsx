import React from "react";
import { observer } from "mobx-react";
import Editor  from "react-medium-editor";
import { contentDefaultMessage, User } from "../App";

export interface IEditorSectionProps {
  readonly onEditorStateChange: (evt: any) => void;

  readonly currentUsers: User[];

  readonly text: string;

  readonly userActivity: string[];
}

export default observer(function EditorSection(props: IEditorSectionProps) {
    return (
      <div className="main-content">
        <div className="document-holder">
          <div className="currentusers">
            {props.currentUsers.map((user) => (
              <React.Fragment>
                <span
                  id={user.userName}
                  className="userInfo"
                  key={user.userName}
                >
                </span>
              </React.Fragment>
            ))}
          </div>
          <Editor
            options={{
              placeholder: {
                text: props.text ? contentDefaultMessage : "",
              },
            }}
            className="body-editor"
            text={props.text}
            onChange={props.onEditorStateChange}
          />
        </div>
        <div className="history-holder">
          <ul>
            {props.userActivity.map((activity: string, index: number) => (
              <li key={`activity-${index}`}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    );
});