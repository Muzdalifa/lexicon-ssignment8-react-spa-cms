import React from 'react';
import './App.css';
import { Table } from './Table';

function App() {
  return (
    <div>
      <h1 className="align-text-center">Welcome to People's records</h1>

      <div className="row py-3">
      <form asp-controller="People" asp-action="Create" method="post" id="create-form" className="p-0">
        <span asp-validation-for="Person.Name" className="text-danger"></span>
        <input asp-for="Person.Name" id="name" placeholder="Enter name" className="me-3" />
        @*<select asp-for="Person.City" asp-items="ViewBag.Cities"></select>*@
        <select asp-for="Person.City" className="me-3" id="addCity">
            <option value="" selected>Select City</option>
            @foreach (City item in Model.Cities)
            {
                <option value="@item.ID">@item.Name</option>
            }
        </select>
        <select asp-for="Person.Languages" className="multiple-select me-3" data-style="btn-default">
            <option value="" selected>Select Languages</option>
            @foreach (Language item in Model.Languages)
            {
                <option value="@item.ID">@item.Name</option>
            }
        </select>
        <span asp-validation-for="Person.PhoneNumber" className="text-danger"></span>
        <input asp-for="Person.PhoneNumber" id="phone" placeholder="Enter phone number" className="me-3" />
        <input type="submit" className="btn btn-secondary me-3" value="Add" />
        <input type="button" className="btn btn-secondary me-3" value="Reset" id="reset" onClick={console.log} />
    </form>
  </div>

<div className="row py-3">
    <form asp-controller="People" asp-action="Index" method="get" className="p-0">
        <label asp-for="Search" className="me-3">Please enter your string to search</label>
        <input asp-for="Search" className="me-3" />
        <input type="submit" className="btn btn-secondary" value="Search" />
    </form>
</div>

<div className="row p-3" id="edit-div">
    <form asp-controller="People" asp-action="Edit" method="post" id="edit-form" className="p-0">
        <label className="me-3">Edit person </label>
        <input id="editID" name="id" type="hidden" />
        <span asp-validation-for="EditPerson.Name" className="text-danger"></span>
        <input asp-for="EditPerson.Name" id="editName" name="name" className="me-3" placeholder="Enter name" />
        <select asp-for="EditPerson.City" id="selectCity" name="city" className="me-3" placeholder="SElect">
            <option value="" selected>Select City</option>
            @foreach (City item in Model.Cities)
            {
                <option value="@item.ID">@item.Name</option>
            }
        </select>
        <select asp-for="EditPerson.Languages" className="multiple-select me-3" data-style="btn-default" id="selectLanguage" name="languages">
            <option value="" selected disabled>Select Languages</option>
            @foreach (Language item in Model.Languages)
            {
                <option id="@item.Name" className="edit" value="@item.ID">@item.Name</option>
            }
        </select>

        <span asp-validation-for="EditPerson.PhoneNumber"></span>
        <input asp-for="EditPerson.PhoneNumber" id="editPhoneNumber" name="phoneNumber" className="me-3" placeholder="Enter phonenumber" />
        <input type="submit" className="btn btn-secondary" id="edit-btn" value="Save" />
    </form>
</div>


<div className="row py-3">
    <div className="col">
        <div className="row bg-gradient bg-opacity-75 bg-secondary header-table">
            <div className="col-md-1">ID</div>
            <div className="col-md-1">Name</div>
            <div className="col-md-2">City</div>
            <div className="col-md-4">Languages</div>
            <div className="col-md-2 w-25">Phone number</div>
            <div className="col-md-1"></div>
            <div className="col-md-1"></div>
        </div>
        <Table />

    </div>
    </div>
</div>
  );
}

export default App;
