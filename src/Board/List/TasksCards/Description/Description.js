import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import {
  createDescription,
  deleteDescription,
} from "../../../../Data/TaskReducer";
import s from "./Description.module.css";
import PageNotFound from "../../../PageNotFound";

let ContainerDescription = () => {
  let id = useParams().descriptionId;
  let task = useSelector((state) => state.tasks).find((item) => item.id === id);
  let content = !task ? <PageNotFound /> : <Description task={task} id={id} />;
  return content;
};

export let Description = ({ task, id }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  let boardId = useParams().boardId;
  let [toggle, setToggle] = useState(task.description !== "");

  const onFinish = (elem) => {
    !toggle && dispatch(createDescription(`${elem.description}`, id));
    setToggle(!toggle);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let textArea = (
    <div key={`textArea${id}`}>
      <Form.Item name="description">
        <Input.TextArea
          className={s.textArea}
          autoSize={true}
          placeholder="Create new Description"
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: "0" }}>
        <Button type="primary" htmlType="submit" className={s.button}>
          Confirm
        </Button>
        <Link to={`/board/${boardId}`}>
          <Button style={{ float: "right" }} className={s.button}>
            Back to board
          </Button>
        </Link>
        <Button
          className={s.button}
          type="link"
          htmlType="button"
          onClick={onReset}
          style={{ float: "right" }}
        >
          Reset
        </Button>
      </Form.Item>
    </div>
  );

  let descriptionText = (
    <div key={`descriptionText${id}`}>
      <Form.Item
        onDoubleClick={() => setToggle(false)}
        className={s.textDescription}
      >
        {task.description}
      </Form.Item>
      <Form.Item style={{ marginBottom: "0" }}>
        <Button type="primary" htmlType="submit">
          Edit
        </Button>
        <Link to={`/board/${boardId}`}>
          <Button style={{ float: "right" }}>Back to board</Button>

          <Button
            danger
            htmlType="button"
            onClick={() => dispatch(deleteDescription(id))}
            style={{ float: "right", margin: "0px 4px" }}
          >
            Delete
          </Button>
        </Link>
      </Form.Item>
    </div>
  );

  return (
    <div className={s.background} key={`container${id}`}>
      <Link to={`/board/${boardId}`} className={s.linkToBoard}></Link>
      <div className={s.container}>
        <Card title={<div>{task.name}</div>} className={s.card}>
          <div>
            <Form
              form={form}
              name="control-hooks"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className={s.form}
              fields={[
                {
                  name: ["description"],
                  value: task.description,
                },
              ]}
            >
              <div>{toggle ? descriptionText : textArea}</div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContainerDescription;
