
import { useDrag } from "react-use-gesture";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setWidgets } from "../../redux/reducers/widgets.reducer";
import { Button, Form, Input, Space } from 'antd';
import "./widgets.css"

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        },
      );
  }, [values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};
export default function Widget() {
  const [form] = Form.useForm();
  const [widgetsPos, setWidgetsPos] = useState({ x: 205, y: 100 });
  const { data, widgetsDiv } = useSelector((state) => state.widgets);
  const dispatch = useDispatch();
  const bindWidgetsPos = useDrag((params) => {
    setWidgetsPos({
      x: params.offset[0],
      y: params.offset[1]
    })
  });
  const closeWidget = () => {
    dispatch(setWidgets());
  }



  return (
    <div {...bindWidgetsPos()} style={{
      position: "absolute",
      top: widgetsPos.y,
      left: widgetsPos.x,
      
    }}>

      <div className="WidgetHeader">
        
        <div  className="WidgetTitle">
           Affaire
        </div >
        <div className="WidgetHeaderParam">
            <div className="widgetExit" onClick={closeWidget}>
         
            </div>
            <div className="widgetZoom">
          
             </div>
        </div>
       
      </div>
      <div style={{ width: "400px", height: "400px", backgroundColor: "white" }}>
        <Form style={{ padding:"10px"}} form={form} name="validateOnly" layout="vertical" autoComplete="off">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form} />
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>

  )
}
