﻿<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="index.aspx.vb" Inherits="Personal_infrormation_system.index" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div>
        <div id="tabs">
            <ul>
                <li><a href="#tabs-1">Personal Info</a></li>
                <li><a href="#tabs-2">Address</a></li>
            </ul>
            <div id="tabs-1" data-bind="with: MyModel" style="background-color: #8fd88c;">

                <form id="form1" name="form1">

                    <div class="form-row">
                        <div class="form-group col-md-2">
                            <label for="salutation">Salutation</label>
                            <select class="form-control" id="salutation" data-bind="
                                value: SalutationId, 
                                options: $root.SalutationList,
                                optionsValue: 'Value', 
                                event:{ change: $root.onChangeOfSalutation},
                                enable:$root.enableDisable,
                                optionsText: 'Text', 
                                optionsCaption: '---SELECT Salutaion---'" >
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="FirstName">First Name</label>
                            <input type="text" data-bind="value: FirstName,enable:$root.enableDisable"
                                class="form-control" id="inputFirstName" placeholder="First Name">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="LastName">Last Name</label>
                            <input type="text" data-bind="value: LastName,enable:$root.enableDisable"
                                class="form-control" id="inputLastName" placeholder="Last Name">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Email">Email</label>
                            <input type="email" data-bind="value: Email,enable:$root.enableDisable" class="form-control"
                                id="inputEmail" placeholder="Email">
                        </div>
                        <div class="form-group col-md-7">
                            <label for="Phone">Phone Number</label>
                            <input type="Phone" data-bind="value: PhoneNumber,enable:$root.enableDisable"
                                class="form-control" id="inputPhone" placeholder="Phone">
                        </div>
                        <div class="form-group col-md-7">
                            <label for="Age">Age</label>
                            <input type="text" data-bind="value: Age,enable:$root.enableDisable" class="form-control"
                                id="inputAge" placeholder="Your Age">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="Gender">Gender: </label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input1" type="radio" value="Male"
                                    data-bind="checked: SelectedGender,enable:$root.enableDisableGender"
                                    name="inlineRadioOptions" id="inlineRadio1">
                                <label class="form-check-label" for="inlineRadio1">Male</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input1" type="radio" value="Female"
                                    data-bind="checked: SelectedGender,enable:$root.enableDisableGender"
                                    name="inlineRadioOptions" id="inlineRadio2">
                                <label class="form-check-label" for="inlineRadio2">Female</label>
                            </div>
                        </div>
                        
                        <!-- <div class="form-check col-md-12">
                            <Label for="Education">Education: </Label>
                            <div data-bind="foreach: $root.availableItems">
                                <input type="checkbox" data-bind="value: id(), checked: $root.associatedItemIds"/>	
                                <span data-bind="text: '&nbsp;' + Name()"></span>
                                
                            </div>
                        </div> -->
                        
                        <div class="form-check col-md-12">
                            <Label for="Education">Education: </Label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input"
                                    data-bind="checked: chosenEdu,enable:$root.enableDisable" type="checkbox"
                                    name="education1" id="inlineCheckbox1" value="SLC">
                                <label class="form-check-label" for="inlineCheckbox1">SLC</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input"
                                    data-bind="checked: chosenEdu,enable:$root.enableDisable" type="checkbox"
                                    name="education2" id="inlineCheckbox2" value="+2">
                                <label class="form-check-label" for="inlineCheckbox2">+2</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input"
                                    data-bind="checked: chosenEdu,enable:$root.enableDisable" type="checkbox"
                                    name="education3" id="inlineCheckbox3" value="Bachelor">
                                <label class="form-check-label" for="inlineCheckbox3">Bachelor</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input"
                                    data-bind="checked: chosenEdu,enable:$root.enableDisable" type="checkbox"
                                    name="education4" id="inlineCheckbox4" value="Masters">
                                <label class="form-check-label" for="inlineCheckbox4">Masters</label>
                            </div>
                        </div>
                        
                        <div class="form-group col-md-3">
                          <label for="country">country</label>
                          <select class="form-control" id="country" data-bind="value: countryId,
                              options: $root.countryList,
                              enable:$root.enableDisable,
                              optionsValue: 'Value',
                              optionsText: 'Text',
                              optionsCaption: '------Select your country--------'">
                          </select>
                      </div>

                        <div class="form-group col-md-3">
                            <label for="Nationality">Nationality</label>
                            <select class="form-control" id="nationality" data-bind="value: NationalId,
                                options: $root.NationalList,
                                enable:$root.enableDisable,
                                optionsValue: 'Value',
                                optionsText: 'Text',
                                optionsCaption: '------Select your Nationality--------'">
                            </select>
                        </div>
                    </div>
                </form>
            </div>


            <div id="tabs-2" style="background-color: #94c797;">
                <div data-bind="with: MyAddress">
                    <div id="dataGrid">
                    </div>
                    <div class="form-group col-md-3" style="padding-top: 25px;">
                        <button class="btn btn-info" data-bind="event: {click: $root.Update},enable: $root.enableDisableUpd" type="button" id="btnupdate"><i class="fas fa-backspace fa-md"> Update</i></button>
                    </div>
                    <div class="form-row" >
                        
                        <div class="form-group col-md-4">
                            <label for="AddressType">Address Type</label>
                            <!-- <select class="form-control" id="addressType" data-bind="
                                value: TypeId,
                                options: $root.AddressTypeList,
                                enable:$root.enableDisable,
                                optionsValue: 'Value',
                                optionsText: 'Text',
                                optionsCaption: '------Select your Address Type--------'">
                            </select> -->
                            <select class="form-control" data-bind="value: AddressTypeId,
                                options: $root.AddressTypeList,
                                enable:$root.enableDisable,
                                optionsValue: 'Value',
                                optionsText: 'Text',
                                optionsCaption: '------Select your Address Type--------'">
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="Province">Province</label>
                            <select class="form-control" id="province" data-bind="value: ProvinceId,
                                options: $root.ProvinceList,
                                enable:$root.enableDisable,
                                optionsValue: 'Value',
                                optionsText: 'Text',
                                optionsCaption: '------Select your Province--------'">
                            </select>
                        </div>
                        <!-- <div class="form-group col-md-4">
                            <label for="City">Type</label>
                            <select data-bind="
                            value: TypeId, 
                            options: $root.TypeList,
                            optionsValue: 'Value', 
                            optionsText: 'Text', 
                            optionsCaption: '---SELECT---'" id="ddlGender">
                            </select>
                            
                        </div>  -->
                        <div class="form-group col-md-4">
                            <label for="City">City</label>
                            <select class="form-control" id="city" data-bind="value: CityId,
                                options: $root.CityList,
                                enable:$root.enableDisable,
                                optionsValue: 'Value',
                                optionsText: 'Text',
                                optionsCaption: '------Select your City--------'">
                            </select>
                        </div>
                        <div class="form-group col-md-12">
                            <label for="CityCategory">City Category: </label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input1" value="Metroplitan"
                                    data-bind="checked: SelectedCat,enable:$root.enableDisable" type="radio"
                                    name="cityCategory" id="metroplitan">
                                <label class="form-check-label" for="metroplitan">Metroplitan</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input1" value="Municipality"
                                    data-bind="checked: SelectedCat, enable:$root.enableDisable" type="radio"
                                    name="cityCategory" id="municipality">
                                <label class="form-check-label" for="municipality">Municipality</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input1" value="SubMunicipality"
                                    data-bind="checked: SelectedCat, enable:$root.enableDisable" type="radio"
                                    name="cityCategory" id="subMunicipality">
                                <label class="form-check-label" for="subMunicipality">Sub Municipality</label>
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="Ward">Ward</label>
                            <input type="text" class="form-control" data-bind="value: Ward, enable:$root.enableDisable"
                                id="ward" placeholder="Ward Number">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="Tole">Tole</label>
                            <input type="text" class="form-control" data-bind="value: Tole, enable:$root.enableDisable"
                                id="tole" placeholder="Tole">
                        </div>
                        
                        

                    </div>
                </div>
            </div>


        </div>
    </div>
</asp:Content>