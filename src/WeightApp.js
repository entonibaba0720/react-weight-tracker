import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
console.log(tomorrow); */

function WeightApp() {
  const [datas, setDatas] = useState([]);

  // only run once the first time this component is rendered
  useEffect(() => {
    if (localStorage.getItem("currentWeightData")) {
      setDatas(JSON.parse(window.localStorage.getItem("currentWeightData")));
    }
  }, []);

  // run every time our pet state changes
  useEffect(() => {
    window.localStorage.setItem("currentWeightData", JSON.stringify(datas));
  }, [datas]);

  return (
    <div>
      <WeightForm setDatas={setDatas} />
      <ul>
        {datas.map((data) => (
          <Data date={data.selectedDate} weight={data.weight} key={data.id} />
        ))}
      </ul>
    </div>
  );
}

function WeightForm(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weight, setWeight] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    props.setDatas((prev) =>
      prev.concat({ selectedDate, weight, id: Date.now() })
    );
    setSelectedDate("");
    setWeight("");
  }

  return (
    <Container className="WeightForm">
      <Row>
        <Col>
          <h1>Weight Tracker</h1>
          <form onSubmit={handleSubmit} required>
            <Form.Label htmlFor="date">Date: </Form.Label>
            <DatePicker
              selected={selectedDate}
              value={Date.now()}
              minDate={new Date("01-01-2020 00:00")}
              maxDate={new Date()}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="d MMMM, yyyy h:mm "
              showTimeSelect
              reqired
            />

            <Form.Label htmlFor="weight">Weight: </Form.Label>
            <input
              type="number"
              value={Number(weight)}
              onChange={(event) => setWeight(event.target.value)}
              required></input>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

function Data(props) {
  return (
    <li>
      On the day {props.date.toLocaleString()} your weight is: {props.weight}
      kg.
    </li>
  );
}

export default WeightApp;
