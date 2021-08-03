const pqOptions = {
    width: "auto",
    height: 250,
    showTitle: false,
    showHeader: true,
    showTop: true,
    showToolbar: false,
    showBottom: false,
    wrap: true,
    hwrap: false,
    sortable: false,
    editable: false,
    resizable: false,
    collapsible: false,
    draggable: true, dragColumns: { enabled: true },
    scrollModel: { autoFit: true },
    numberCell: { show: true, resizable: true, title: "S.N.", minWidth: 30 },
    pageModel: { curPage: 1, rPP: 10, type: "local" },
    columnTemplate: { wrap: true, editable: false, dataType: "string", halign: "center", hvalign: "center", resizable: true, styleHead: { 'font-weight': "bold" } },
};

// function DemoItem(id, name) {
//     var self = this;

//     self.id = ko.observable(id);
//     self.Name = ko.observable(name);
//     self.Selected = ko.observable(false);
// }

function tabpq() {
    const self = this;

    var isNullOrEmpty = function (str) {
        if (str === undefined || str === null) {
            return true;
        } else if (typeof str === "string") {
            return (str.trim() === "");
        } else {
            return false;
        }
    };

    var isNumeric = function (str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail

    };

    const models = {
        MyModel: function (item) {
            item = item || {};
            this.SalutationId = ko.observable(item.SalutationId || "");
            this.salutation = ko.observable(item.salutation || "");
            this.FirstName = ko.observable(item.FirstName || "");
            this.LastName = ko.observable(item.LastName || "");
            this.Email = ko.observable(item.Email || "");
            this.PhoneNumber = ko.observable(item.PhoneNumber || "");//extend({ round: 2 });
            this.Age = ko.observable(item.Age || "");
            this.chosenEdu = ko.observableArray([]);
            this.SelectedGender = ko.observable();
            this.Male = ko.computed({
                read: function () {
                    return this.SelectedGender() == "Male";
                },
                write: function (value) {
                    if (value)
                        this.SelectedGender("Male");
                }

            }, this);
            this.countryId = ko.observable(item.countryId || "");
            this.country = ko.observable(item.country || "");
            this.NationalId = ko.observable(item.NationalId || "");
            this.Nationality = ko.observable(item.Nationality || "");
        },

        MyAddress: function (item1) {
            item1 = item1 || {};
            this.AddressTypeId = ko.observable(item1.AddressTypeId || "");
            this.AddressType = ko.observable(item1.AddressType || "");
            this.ProvinceId = ko.observable(item1.ProvinceId || "");
            this.Province = ko.observable(item1.Province || "");
            this.CityId = ko.observable(item1.CityId || "");
            this.City = ko.observable(item1.City || "");
            this.SelectedCat = ko.observable();
            this.Metroplitan = ko.computed({
                read: function () {
                    return this.SelectedCat() == "Metroplitan";
                },
                write: function (value) {
                    if (value)
                        this.SelectedCat("Metroplitan");
                }

            }, this);
            this.Ward = ko.observable(item1.Ward || "");
            this.Tole = ko.observable(item1.Tole || "");

        },

        UiElements: function () {
            self.MyModel = ko.observable(new models.MyModel());
            self.MyAddress = ko.observable(new models.MyAddress());
            self.DataList = ko.observableArray([]);
            self.HdnId = ko.observable('');
            
            self.enableDisable = ko.observable(false);
            self.enableDisableGender = ko.observable(false);
            self.enableDisableAdd = ko.observable(true);
            self.enableDisableSave = ko.observable(false);
            self.enableDisableClear = ko.observable(false);
            self.enableDisableUpd = ko.observable(false);
            
            
            self.SalutationList = ko.observableArray([
                { Text: 'Mr.', Value: '0' },
                { Text: 'Ms.', Value: '1' },
                { Text: 'Mrs.', Value: '2' },
            ]);
            self.countryList = ko.observableArray([
                { Text: 'Nepal', Value: '0' },
                { Text: 'China', Value: '1' },
                { Text: 'India', Value: '2' },
            ]);
            self.NationalList = ko.observableArray([
                { Text: 'Nepalese', Value: '0' },
                { Text: 'Chinese', Value: '1' },
                { Text: 'Indian', Value: '2' },
            ]);
            self.AddressTypeList = ko.observableArray([
                { Text: 'Permanent', Value: '0' },
                { Text: 'Temporary', Value: '1' },
            ]);

            self.ProvinceList = ko.observableArray([
                { Text: 'Province 1', Value: '0' },
                { Text: 'Province 2', Value: '1' },
                { Text: 'Province 3', Value: '2' },
                { Text: 'Province 4', Value: '3' },
                { Text: 'Province 5', Value: '4' },
                { Text: 'Province 6', Value: '5' },
                { Text: 'Province 7', Value: '6' },
            ]);
            self.CityList = ko.observableArray([
                { Text: 'Kathmandu', Value: '0' },
                { Text: 'Lalitpur', Value: '1' },
                { Text: 'Pokhara', Value: '2' },
                { Text: 'Bhartpur', Value: '3' },
                { Text: 'Biratnagar', Value: '4' },
                { Text: 'Nepaljung', Value: '5' },
            ]);

        },
    };

    const UiEvents = {
        validate: {
            SaveValidation: function () {
                // debugger
                if (isNullOrEmpty(self.MyModel().FirstName())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputFirstName").focus();
                    alert("First Name is Required");
                }
                else if(isNullOrEmpty(self.MyModel().SalutationId())){
                    $("#tabs").tabs({ active: 0 });
                    $("#salutation").focus();
                    alert("Salutation must be entered")
                }

                else if (isNullOrEmpty(self.MyModel().LastName())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputLastName").focus();
                    alert("Last Name is Required");
                }
                else if (isNullOrEmpty(self.MyModel().Email())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputEmail").focus();
                    alert("Email is Required");
                }
                else if (!(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i).test(self.MyModel().Email())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputEmail").focus();
                    alert("Invalid Email");
                }
                else if (isNullOrEmpty(self.MyModel().PhoneNumber())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    alert("Phone Number is Required");
                }
                else if (!(isNumeric(self.MyModel().PhoneNumber()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    alert("Phone Number Should be Number")
                }
                else if (!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/).test(self.MyModel().PhoneNumber())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputPhone").focus();
                    alert("Phone Number is Invalid");
                }
                else if (isNullOrEmpty(self.MyModel().Age())) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    alert("Age is Required");
                }
                else if (!(isNumeric(self.MyModel().Age()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    alert("Age must be in Number");
                }
                else if (!((self.MyModel().Age() < 100) && (self.MyModel().Age() > 16))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#inputAge").focus();
                    alert("Age must be Above 16 and below 100");
                }
                else if(!(self.MyModel().SelectedGender() == "Male" || self.MyModel().SelectedGender() == "Female")){
                    $("#tabs").tabs({ active: 0 });
                    $("#inlineRadio1").focus();
                    alert("Choose the Gender");
                }
                else if((self.MyModel().chosenEdu() == "")){
                    $("#tabs").tabs({ active: 0 });
                    $("#inlineCheckbox1").focus();
                    alert("Select your Education");
                } 
                else if(isNullOrEmpty(self.MyModel().countryId())){
                    $("#tabs").tabs({ active: 0 });
                    $("#country").focus();
                    alert("country must be entered")
                }  
                else if(isNullOrEmpty(self.MyModel().NationalId())){
                    $("#tabs").tabs({ active: 0 });
                    $("#nationality").focus();
                    alert("Nationality must be entered")
                }
                else if (isNullOrEmpty(self.MyAddress().AddressTypeId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#addressType").focus();
                    alert("Address Type Should must be entered");
                }
                else if (isNullOrEmpty(self.MyAddress().ProvinceId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#province").focus();
                    alert("Province Should must be entered");
                }
                else if (isNullOrEmpty(self.MyAddress().CityId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#city").focus();
                    alert("City Should must be entered");
                }
                else if (!(self.MyAddress().SelectedCat() == "Metroplitan" || self.MyAddress().SelectedCat() == "Municipality" || self.MyAddress().SelectedCat() == "SubMunicipality")) {
                    $("#tabs").tabs({ active: 1 });
                    $("#Metroplitan").focus();
                    alert("Choose the City Category");
                }
                else if (isNullOrEmpty(self.MyAddress().Ward())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#ward").focus();
                    alert("Ward Should must be entered");
                }
                else if (!(self.MyAddress().Ward() < 21)) {
                    alert("Ward must be below 20");
                    $("#tabs").tabs({ active: 1 });
                    $("#ward").focus();
                    return;
                }
                else if (isNullOrEmpty(self.MyAddress().Tole())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#tole").focus();
                    alert("Tole must be entered");
                }

                else {
                    // if ((ko.toJS(obj.DataList)).find(x => (x.FullName == self.MyModel().FullName()) && (x.Age == self.MyModel().Age()) && (x.PhoneNumber == self.MyModel().PhoneNumber()) && (x.GenderId == self.MyModel().GenderId()))) {
                    //     alert("Warning! - Information Already Exists!!....");
                    //     UiEvents.clear.clearfield();
                    // }

                    // self.MyModel().SalutationName((self.SalutationList().find(X => X.Value == self.MyModel().SalutationId()) || {}).Text);
                    // self.MyModel().Nationality((self.NationalList().find(X => X.Value == self.MyModel().NationalId()) || {}).Text);
                    self.MyAddress().AddressType((self.AddressTypeList().find(X => X.Value == self.MyAddress().AddressTypeId()) || {}).Text);
                    self.MyAddress().Province((self.ProvinceList().find(X => X.Value == self.MyAddress().ProvinceId()) || {}).Text);
                    self.MyAddress().City((self.CityList().find(X => X.Value == self.MyAddress().CityId()) || {}).Text);
                    self.DataList.push(ko.toJS(self.MyAddress()));


                    return true;


                }
            },

            UpdateValidation: function () {
                if (isNullOrEmpty(self.MyAddress().AddressTypeId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#addressType").focus();
                    alert("Address Type Should must be entered");
                }
                else if (isNullOrEmpty(self.MyAddress().ProvinceId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#province").focus();
                    alert("Province Should must be entered");
                }
                else if (isNullOrEmpty(self.MyAddress().CityId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#city").focus();
                    alert("City Should must be entered");
                }
                else if (!(self.MyAddress().SelectedCat() == "Metroplitan" || self.MyAddress().SelectedCat() == "Municipality" || self.MyAddress().SelectedCat() == "SubMunicipality")) {
                    $("#tabs").tabs({ active: 1 });
                    $("#Metroplitan").focus();
                    alert("Choose the City Category");
                }
                else if (isNullOrEmpty(self.MyAddress().Ward())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#ward").focus();
                    alert("Ward Should must be entered");
                }
                else if (!(self.MyAddress().Ward() < 21)) {
                    alert("Ward must be below 20");
                    $("#tabs").tabs({ active: 1 });
                    $("#ward").focus();
                    return;
                }
                else if (isNullOrEmpty(self.MyAddress().Tole())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#tole").focus();
                    alert("Tole must be entered");
                }
                else{
                    return true;
                }          
            },
        },
        
        clear: {
            ResetAll: function () {
               self.MyModel(new models.MyModel());
                self.MyAddress(new models.MyAddress());
                self.DataList([]);
            },

            clearfield: function () {
               self.MyModel(new models.MyModel());
                self.MyAddress(new models.MyAddress());
                $("#tabs").tabs();

            },

        },

        functions: {
            Save: function (control) {
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.DataList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [
                        { title: "Type", align: "left", dataIndx: "AddressType", width: "10%" },
                        { title: "Province", align: "center", dataIndx: "Province", width: "15%" },
                        { title: "City", align: "center", dataIndx: "City", width: "15%" },
                        { title: "CityCategory", align: "Center", dataIndx: "SelectedCat", width: "15%" },
                        { title: "Ward", align: "Center", dataIndx: "Ward", width: "10%" },
                        { title: "Tole", align: "Center", dataIndx: "Tole", width: "15%" },
                        {
                            title: "Action", align: "Center", width: "20%", render: function (ui) {

                                return `<button class="btn btn-danger" onclick="obj.delete(${ui.rowIndx});" type="button"><i class="fas fa-trash fa-lg">  Delete</i></button>  <button class="btn" style="background-color: #66CD00" onclick="obj.edit(${ui.rowIndx});" type="button"><i class="fas fa-edit fa-lg">Edit</i></button>`;
                            }
                        },

                    ];

                    options.dataModel = { data: ko.toJS(self.DataList()) };
                    options.showBottom = false;
                    $("#" + control).pqGrid(options);
                }
            }
        },

    };



    self.onChangeOfsalutation = function () {
        if (self.MyModel().SalutationId() == "0") {
            self.MyModel().SelectedGender("Male");
            self.enableDisableGender(false);
        }
        else if (self.MyModel().SalutationId() == "1" || self.MyModel().SalutationId() == "2") {
            self.MyModel().SelectedGender("Female");
            self.enableDisableGender(false);
        }
        else {
            self.enableDisableGender(true);
            return;
        }

    };

    self.Save = function () {

        if (UiEvents.validate.SaveValidation()) {
            UiEvents.functions.Save("dataGrid");
            UiEvents.clear.clearfield();
            self.enableDisableClear(false);
            self.enableDisableAdd(true);
            self.enableDisableSave(false);
            self.enableDisable(false);

        }
    };

    self.Clear = function () {
        UiEvents.clear.clearfield();
        self.enableDisableClear(false);
        self.enableDisableAdd(true);
        self.enableDisableSave(false);
        self.enableDisable(false);
        UiEvents.functions.Save("dataGrid");
        
    };

    self.Add = function () {
        self.enableDisableSave(true);
        self.enableDisableClear(true);
        self.enableDisable(true);
        self.enableDisableGender(true);
        self.enableDisableAdd(false);
        UiEvents.functions.Save("dataGrid");
        
    };

    self.delete = function deleteRow(index) {

        self.DataList.splice(index, 1);
        UiEvents.functions.Save("dataGrid");

    };
    self.edit = function editRow(index) {
        debugger
        var a = $('#dataGrid').pqGrid("getRowData", { rowIndx: index });
        self.MyAddress().AddressTypeId(a.AddressTypeId);
        self.MyAddress().ProvinceId(a.ProvinceId);
        self.MyAddress().CityId(a.CityId);
        self.MyAddress().SelectedCat(a.SelectedCat);
        self.MyAddress().Ward(a.Ward);
        self.MyAddress().Tole(a.Tole);
        self.enableDisableSave(false);
        self.enableDisableUpd(true);
        self.enableDisableClear(false);
        self.enableDisable(true);

        self.HdnId(index);
        // self.UpdateInfo = function(){
        // debugger
        // var ind = a.pq_ri


        // UiEvents.functions.Save("demoGrid");  
        // }
    };

    self.Update = function () {
        debugger
        if (isNullOrEmpty(self.HdnId())) {
            alert('Error!!......Invalid Selection!!');
        }
        else {
            self.MyAddress().AddressType((self.AddressTypeList().find(X => X.Value == self.MyAddress().AddressTypeId()) || {}).Text);
            self.MyAddress().Province((self.ProvinceList().find(X => X.Value == self.MyAddress().ProvinceId()) || {}).Text);
            self.MyAddress().City((self.CityList().find(X => X.Value == self.MyAddress().CityId()) || {}).Text);
                    
            let list = ko.toJS(self.DataList());

            list[self.HdnId()].AddressType = self.MyAddress().AddressType();
            list[self.HdnId()].Province = self.MyAddress().Province();
            list[self.HdnId()].City = self.MyAddress().City();
            list[self.HdnId()].SelectedCat = self.MyAddress().SelectedCat();
            list[self.HdnId()].Ward = self.MyAddress().Ward();
            list[self.HdnId()].Tole = self.MyAddress().Tole();
            
            if (UiEvents.validate.UpdateValidation()) {
                self.DataList([]);
                self.DataList(list);
                UiEvents.functions.Save("dataGrid");
                UiEvents.clear.clearfield();
                self.enableDisableSave(false);
                self.enableDisableUpd(false);
                self.enableDisableClear(false);
                self.enableDisable(false);
                self.enableDisableAdd(true);
                self.HdnId('');               
            }
            
        } 
    };



    function Init() {
        models.UiElements();
        $("#tabs").tabs();
        UiEvents.clear.ResetAll();
        
        // UiEvents.functions.Save("dataGrid");
        $("#tabs, #tabs-2").click(function () {
            // alert("asd");
            UiEvents.functions.Save("dataGrid");
        });

    }

    Init();
}

var obj;

$(document).ready(function () {
    obj = new tabpq();
    ko.applyBindings(obj);


});