import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardText from 'react-md/lib/Cards/CardText';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import { reduxForm, Field } from 'redux-form';
import { projectCreate } from './actions/project-create.actions';
import ReduxedTextField from '../../../../components/ReduxedTextField/';
import './ProjectCreate.css';


class ProjectCreate extends Component {

  submit = (values) => {
    this.props.projectCreate(
      {
        name: values['name'],
        buyer: this.props.login['username'],
        description: values['description'],
        spec: values['spec'],
        price: values['price'], // todo: allow cents and send x100 int to API
        targetDelivery: +new Date(values['targetDelivery']),
        addressStreet: values['addressStreet'],
        addressCity: values['addressCity'],
        addressState: values['addressState'],
        addressZip: values['addressZip'],
      }
    );
  };

  render() {
    const {handleSubmit} = this.props;

    return (
      <section>
        <div className="md-grid">
          <Card className="md-cell md-cell--12">
            <CardTitle
              title="New Project"
            />
            <CardText>
              <form onSubmit={handleSubmit(this.submit)}>
                <div className="md-grid">
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    label="Short name"
                    required
                    maxLength={50}
                    className="md-cell--4"
                    component={ReduxedTextField} />
                  <div className="md-cell--12" />
                  <Field
                    id="description"
                    name="description"
                    type="text"
                    label="Description"
                    maxLength={50}
                    className="md-cell--4"
                    component={ReduxedTextField} />
                  <div className="md-cell--12" />
                  <Field
                    id="price"
                    name="price"
                    type="number"
                    label="Desired price"
                    min="1"
                    step="1"
                    required
                    className="md-cell--4"
                    component={ReduxedTextField} />
                  <div className="md-cell--12" />
                  <Field
                    id="targetDelivery"
                    name="targetDelivery"
                    label="Desired delivery date"
                    className="md-cell--4"
                    required
                    type="date" // ignore the console warnings, todo: implement Date Picker with redux form
                    component={ReduxedTextField}
                  />
                  <div className="md-cell--12" />
                  {/*<Field*/}
                    {/*id="addressStreet"*/}
                    {/*name="addressStreet"*/}
                    {/*type="text"*/}
                    {/*label="Street"*/}
                    {/*className="md-cell--4"*/}
                    {/*component={ReduxedTextField} />*/}
                  {/*<div className="md-cell--12" />*/}
                  {/*<Field*/}
                    {/*id="addressCity"*/}
                    {/*name="addressCity"*/}
                    {/*type="text"*/}
                    {/*label="City"*/}
                    {/*className="md-cell--4"*/}
                    {/*component={ReduxedTextField} />*/}
                  {/*<div className="md-cell--12" />*/}
                  {/*<Field*/}
                    {/*id="addressState"*/}
                    {/*name="addressState"*/}
                    {/*type="text"*/}
                    {/*label="State"*/}
                    {/*maxLength={2}*/}
                    {/*className="md-cell--4"*/}
                    {/*component={ReduxedTextField} />*/}
                  {/*<div className="md-cell--12" />*/}
                  {/*<Field*/}
                    {/*id="addressZip"*/}
                    {/*name="addressZip"*/}
                    {/*type="text"*/}
                    {/*label="Zip code"*/}
                    {/*maxLength={5}*/}
                    {/*className="md-cell--4"*/}
                    {/*component={ReduxedTextField} />*/}
                  {/*<div className="md-cell--12" />*/}
                  <Field
                    id="spec"
                    name="spec"
                    type="text"
                    label="Specification"
                    maxLength={1000}
                    rows={6}
                    className="md-cell--4"
                    component={ReduxedTextField} />
                  <div className="md-cell--12" />
                  <Button raised primary label="Create" type="submit" />
                </div>
              </form>
            </CardText>
          </Card>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project,
    login: state.login,
  };
}

const connected = connect(mapStateToProps, { projectCreate })(ProjectCreate);

const formedComponent = reduxForm({ form: 'project-create'})(connected);

export default formedComponent;
