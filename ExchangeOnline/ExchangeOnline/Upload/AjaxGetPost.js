var TargetUrl;
var AjaxTargetUrl;

function PostAjax(targetUrl, jsonData, methodName) {
    CheckAjaxUrl(targetUrl);
    $.ajax({
        type: "POST",
        url: AjaxTargetUrl,
        contentType: "application/json; charset=utf-8",
        dataType: "Json",
        data: jsonData,
        success: function (data) {
            DynamicAjaxMethod(methodName,data);
        }
    });
}

function GetAjaxWithoutDataPassing(targetUrl,MethodName) {
    debugger;
    CheckAjaxUrl(targetUrl);
    $.ajax({
        url: AjaxTargetUrl,
        method: "GET",
        dataType: 'json',
        success: function (data) {
            DynamicAjaxMethod(MethodName, data);
        }
    });
}

function AutoComplete(Id, UrlCode, cntxtKey, hiddenFields, method) {
    var context = $("#" + cntxtKey).val();
    CheckUrl(UrlCode);
    $('#' + Id).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: TargetUrl,
                type: "GET",
                data: { prefix: request.term, ContextKey: context },
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    response($.map(data, function (item) {
                        return { value: item };
                    }));
                }
            });
            return false;
        },
        minLength: 1,
        select: function (event, ui) {
            if (ui.item.value != "No matching found..!") {
                $("#" + Id).val(ui.item.value);
            }
        },
        close: function (event, ui) {
            var SelectedValue = $("#" + Id).val();
            AutoCompleteCheck(Id, SelectedValue, hiddenFields, method);
            var inputs = $(this).closest('form').find(':input:visible:enabled').not("[readonly]");
            if (event.keyCode == 13) {
                inputs.eq(inputs.index(this) + 1).focus().select();
            }
        }
    })
}

function AutoCompleteCheck(Id, SelectedValue, hiddenFields, method) {
    var arr = [];
    var hiddenArr = [];
    var hidden1, hidden2, hidden3;
    hiddenArr = hiddenFields.split(',');
    if (hiddenArr.length > 0) {
        switch (hiddenArr.length) {
            case 1:
                hidden1 = hiddenArr[0];
                break;
            case 2:
                hidden1 = hiddenArr[0];
                hidden2 = hiddenArr[1];
                break;
            case 3:
                hidden1 = hiddenArr[0];
                hidden2 = hiddenArr[1];
                hidden3 = hiddenArr[2];
                break;
            default:
                break;
        }
    }
    arr = SelectedValue.split('|');
    switch (arr.length) {
        case 1:
            $("#" + Id).val(arr[0]);
            $("#" + hidden1).val('');
            oneValCheck(Id, hidden1, method);
            break;
        case 2:
            $("#" + Id).val(arr[0]);
            $("#" + hidden1).val(arr[1]);
            twoValCheck(Id, hidden1, method);
            break;
        case 3:
            $("#" + Id).val(arr[0]);
            $("#" + hidden1).val(arr[1]);
            $("#" + hidden2).val(arr[2]);
            ThreeValCheck(Id, hidden1, hidden2);
            break;
        default:
            break;
    }
}

function oneValCheck(NameId, CodeId, method) {
    var Name = $("#" + NameId).val();
    var Code = $("#" + CodeId).val();
    if (Name == "No matching found..!" || Code == "") {
        swal({
            title: "Field selected invalid value", text: '',
            timer: 1000, buttons: false
        });
        $("#" + NameId).val('');
        $("#" + CodeId).val('');
        $("#" + NameId).focus();
        return false;
    }
    if (Name != "" && Name != "") {
        if (method != undefined) {
            DynamicMethod(method);
        }
    }
}

function twoValCheck(NameId, CodeId, method) {
    var Name = $("#" + NameId).val();
    var Code = $("#" + CodeId).val();
    if (Name == "" || Code == "") {
        swal({
            title: "Field cant be empty", text: '',
            timer: 1000, buttons: false
        });
        $("#" + NameId).val('');
        $("#" + CodeId).val('');
        $("#" + NameId).focus();
        return false;
    }
    if (Name == "No matching found..!" || Code == "") {
        swal({
            title: "Field selected invalid value", text: '',
            timer: 1000, buttons: false
        });
        $("#" + NameId).val('');
        $("#" + CodeId).val('');
        $("#" + NameId).focus();
        return false;
    }
    if ((Name == "No matching found..!" && Code != "") || (Name == "" && Code != "")) {
        swal({
            title: "Field selected invalid value", text: '',
            timer: 1000, buttons: false
        });
        $("#" + NameId).val('');
        $("#" + CodeId).val('');
        $("#" + NameId).focus();
        return false;
    }
    if (Name != "" && Name != "") {
        if (method != undefined) {
            DynamicMethod(method);
        }
    }
}

function ThreeValCheck(NameId, CodeId, CodeId2, method) {
    var Name = $("#" + NameId).val();
    var Code = $("#" + CodeId).val();
    if (Name == "" || Code == "") {
        swal({
            title: "Field cant be empty", text: '',
            timer: 1000, buttons: false
        });
        $("#" + NameId).val('');
        $("#" + CodeId).val('');
        $("#" + CodeId2).val('');
        $("#" + NameId).focus();
        return false;
    }
    if (Name == "No matching found..!" || Code == "") {
        swal({
            title: "Field selected invalid value", text: '',
            timer: 1000, buttons: false
        });
        $("#" + NameId).val('');
        $("#" + CodeId).val('');
        $("#" + CodeId2).val('');
        $("#" + NameId).focus();
        return false;
    }
    if ((Name == "No matching found..!" && Code != "") || (Name == "" && Code != "")) {
        swal({
            title: "Field selected invalid value", text: '',
            timer: 1000, buttons: false
        });
        $("#" + NameId).val('');
        $("#" + CodeId).val('');
        $("#" + CodeId2).val('');
        $("#" + NameId).focus();
        return false;
    }
}

function DynamicMethod(method) {
    switch (method) {
        case "CustDetails":
            CustDetails();
            break;
        case "ValidateCust":
            ValidateCust();
            break;
        case "getState":
            getState();
            break;
        case "GetDetails":
            GetDetails();
            break;
        case "ValidateVendor":
            ValidateVendor();
            break;
        case "getOrigin":
            getOrigin();
            break;
        case "getLocationData":
            getLocationData();
            break;
        case "ValidateAir1":
            ValidateAir1();
            break;
        case "ValidateCompany":
            ValidateCompany();
            break;
        case "ValidateDestination":
            ValidateDestination();
            break;
        case "ValidateProduct":
            ValidateProduct();
            break;
        case "ValidateServ":
            ValidateServ();
            break;
        case "getCustNew":
            getCustNew();
            break;
        default:

    }
}

var Data = {
    '1': '/AutoComplete/GetCustomer',
    '2': '/AutoComplete/GetDestination',
    '3': '/AutoComplete/GetVXCustomer',
    '4': '/AutoComplete/GetConsigneePin',
    '5': '/AutoComplete/GetGroupMaster',
    '6': '/AutoComplete/GetZone',
    '7': '/AutoComplete/GetConsigneeFlight',
    '8': '/AutoComplete/GetDestination',
    '9': '/AutoComplete/GetCustomer1',
    '10': '/AutoComplete/getitem',
    '11': '/AutoComplete/GetPincode',
    '12': '/AutoComplete/GetShipper',
    '13': '/AutoComplete/GetOrigin',
    '14': '/AutoComplete/GetCompany',
    '15': '/Autocomplete/GetProduct',
    '16': '/AutoComplete/GetAirlines',
    '17': '/AutoComplete/GetAwbNo',
    '18': '/AutoComplete/GetCountry',
    '19': '/AutoComplete/GetAirlinesServices',
    '20': '/AutoComplete/GetVendor',
    '21': '/AutoComplate/GetOBC',
    '22': '/AutoComplete/GETPONumber',
    '23': 'AutoComplete/GetInstruction',
    '24': '/AutoComplete/GetContent',
    '25': '/AutoComplete/GetState',
    '26': '/AutoComplete/GetContractHead',
    '27': '/AutoComplete/GetAccVend',
    '28': '/AutoComplete/GetCourier',
    '29': '/AutoComplete/GetLocation',
    '30': '/AutoComplete/GetPaymentType',
    '31': '/AutoComplete/GetVXOrigin',
    '32': '/AutoComplete/GetVXProduct',
    '33': '/AutoComplete/GetVXVendor',
    '34': '/AutoComplete/GetVXDestination',
    '35': '/AutoComplete/GetTelAuto',
    '36': '/AutoComplete/GetSalesExc',
    '37': '/AutoComplete/GetCurrencyNew',
    '38': '/AutoComplete/GetLedger',
    '40': '/AutoComplete/GetVehicle'
};

function CheckUrl(urlCode) {
    Object.keys(Data).forEach(function (key) {
        if (key == urlCode) {
            TargetUrl = Data[key];
        }
    });
}


var AjaxData = {
    '1': '/DrsScan/DrsWork',
    '2': '/DrsScan/EditGrdRow',
    '3': '/DrsScan/GetEditingGrid',
    '4': '/DrsScan/DeleteMainGrdRow',
    '5': '/DrsScan/DeleteInnerTableData',
    '6': '/DrsScan/SearchByReferenceNo',
    '7': '/DrsScan/GetVehicle',
    '8': '/DrsScan/AddDrsCost',
    '9': '/DocumentType/EditDocumentType',
    '10': '/ManifestScan/BindTable',
    '11': '/ManifestScan/progressSave',
    '12': '/ManifestScan/EditMani',
    '13': '/DocumentType/DeleteDocumentType',
    '14': '/DocumentType/SaveUpdateDocument',
    '15': '/ManifestScan/DeleteMani',
    '16': '/ManifestScan/SearchMani',
    '17': '/StateMasters/SaveState',
    '18': '/StateMasters/EditState',
    '19': '/StateMasters/DeleteStates',
    '20': '/Service3/getVehicleOwner',
    '21': '/Service3/getOwnerDetails',
    '22': '/Service3/getDriverDetails',
    '23': '/Service3/getLocationData',
    '24': '/Service3/getVendor',
    '25': '/AreaMaster/SaveUpdate',
    '26': '/AreaMaster/EditAreaMaster',
    '27': '/AreaMaster/DeleteAreaMaster',
    '28': '/ManifestScan/getManiNo',
    '29': '/ManifestScan/DoWork',
    '30': '/ManifestScan/SaveMani',
    '31': '/ManifestScan/AddUnManifestedAwbNos',
    '32': '/ManifestScan/DoWork2',
    '33': '/locationMast/LocationMastSave',
    '34': '/LocationMast/LocationMastEdit',
    '35': '/LocationMast/LocationMastDelete',
    '36': '/ManifestScan/GetUnmanifest',
    '37': '/Service3/getOrigincs',
    '38': '/Service3/getProduct',
    '39': '/Service3/getServiceDt',
    '40': '/Service3/getCustomerNew',
    '41': '/Service3/getString',
    '42': '/Service3/getCustomer',
    '43': '/Service3/getCompValidate',
    '44': '/Inscan/GetMappingData',
    '45': '/Inscan/pickupscan',
    '46': '/Inscan/Addhold',
    '47': '/Service3/shiplogsearch',
    '48': '/Inscan/DownloadData',
    '49': '/Inscan/GetInscanData',
    '50': '/Inscan/GetCustomerVol',
    '51': '/Inscan/GetDivideByVal',
    '52': '/Inscan/CheckAWBNo',
    '53': '/SalesExMast/SaveSalesExMast',
    '54': '/SalesExMast/EditSalesExMast',
    '55': '/SalesExMast/DeleteSalesMast',
    '56': '/Airline/SaveUpdate',
    '57': '/Airline/EditAirline',
    '58': '/Airline/DeleteAirline',
    '59': '/ChargeMaster/EditChargeMast',
    '60': '/ChargeMaster/DeleteChargeMast',
    '61': '/ChargeMaster/SaveUpdate',
    '62': '/CompanyMast/SaveCompanyMast',
    '63': '/CompanyMast/EditCompanyMast',
    '64': '/CompanyMast/DeleteCompanyMast',
    '65': '/CountryMast/SaveUpdateCountry',
    '66': '/CountryMast/EditCountryMast',
    '67': '/CountryMast/DeleteCountryMast',
    '68': '/Courier/SaveUpdate',
    '69': '/Courier/EditCourier',
    '70': '/Courier/DeleteCourier',
    '71': '/Instruction/Edit',
    '72': '/Instruction/Delete',
    '73': '/DriverMast/LoadGrid',
    '74': '/DriverMast/Delete',
    '75': '/Instruction/Insert',
    '76': '/LocalBranch/Update',
    '77': '/LocalBranch/Addfinyeardata',
    '78': '/LocalBranch/LoadGrid',
    '79': '/DestinationMast/DestMastSave',
    '80': '/DestinationMast/DestMastEdit',
    '81': '/DestinationMast/DestMastDeletes',
    '82': '/ExcpMast/SaveUpdate',
    '83': '/ExcpMast/EditExcp',
    '84': '/ExcpMast/DeleteExcp',
    '85': '/ExpenseMast/SaveUpdate',
    '86': '/ExpenseMast/EditExpenseMast',
    '87': '/ExpenseMast/DeleteExpenseMast',
    '88': '/FreeFormDescription/SaveUpdate',
    '89': '/FreeFormDescription/EditFreeDesc',
    '90': '/FreeFormDescription/DeleteFreeDesc',
    '91': '/ItemMast/SaveUpdate',
    '92': '/ItemMast/DeleteItemMast',
    '93': '/ItemMast/EditItemMast',
    '94': '/OBCDescriptionMast/SaveUpdate',
    '95': '/OBCDescriptionMast/EditDesc',
    '96': '/OBCDescriptionMast/DeleteDesc',
    '97': '/ProductMaster/SaveState',
    '98': '/ProductMaster/EditState',
    '99': '/ProductMaster/DeleteState',
    '100': '/MstAutoJobAllocate/SaveJobAllocate',
    '101': '/MstAutoJobAllocate/EditAutoJob',
    '102': '/MstAutoJobAllocate/DeleteJobAlot',
    '103': '/ZoneMast/Save',
    '104':  '/ZoneMast/ZoneMastEdit',
    '105': '/ZoneMast/ZoneMastDelete',
    '106': '/FlightMast/SaveUpdate',
    '107': '/FlightMast/EditFlight',
    '108': '/FlightMast/DeleteFlight',
    '109': '/GroupMast/Insert',
    '110': '/GroupMast/Delete',
    '111': '/GroupMast/Edit',
    '112': '/ManifestView/BindReport',
    '113': '/ManifestView/ViewMenifest',
    '114': '/IndustryMast/SaveUpdateIndustryMast',
    '115': '/IndustryMast/EditIndustryMast',
    '116': '/IndustryMast/DeleteIndustryMast',
    '117': '/HolidayMaster/LoadGrid',
    '118': '/HolidayMaster/Delete',
    '119': '/MstCutomer/Getcontamt',
    '120': '/MstCutomer/getLocationData',
    '121': '/MstCutomer/Save',
    '122': '/MstCutomer/SaveCopy',
    '123': '/MstCutomer/Edit',
    '124': '/MstCutomer/ValidatePin',
    '125': '/MstCutomer/SaveCV',
    '126': '/MstCutomer/DeleteCV',
    '127': '/MstCutomer/DeleteFS',
    '128': "/MstCutomer/DeleteOC",
    '129': '/MstCutomer/EditFS',
    '130': '/MstCutomer/EditOC',
    '131': '/MstCutomer/EditCV',
    '132': '/MstCutomer/SearchFS',
    '133': '/MstCutomer/SearchOC',
    '134': '/MstCutomer/SearchCV',
    '135': '/MstCutomer/Delete',
    '136': '/MstCutomer/SaveFS',
    '137': '/MstCutomer/SaveOC',
    '138': '/VendorMaster/SaveVendor',
    '139': '/VendorMaster/DeleteState',
    '140': '/VendorMaster/EditVendor',
    '141': '/VendorMaster/SaveFS',
    '142': '/VendorMaster/DeleteFS',
    '143': '/VendorMaster/EditFS',
    '144': '/VendorMaster/SaveOC',
    '145': '/VendorMaster/SearchOC',
    '146': '/VendorMaster/DeleteOC',
    '147': '/VendorMaster/EditOC',
    '148': '/VendorMaster/SaveCV',
    '149': '/VendorMaster/DeleteCV',
    '150': '/VendorMaster/EditCV',
    '151': '/VehicleOwnerMast/LoadGrid',
    '152': '/VehicleOwnerMast/Delete',
    '153': '/RouteMast/Edit',
    '154': '/RouteMast/Delete',
    '155': '/RouteMast/GetAutoDetails',
    '156': '/RouteMast/Search',
    '157': '/ConsigneeMast/Edit',
    '158': '/ConsigneeMast/Delete',
    '159': '/ConsigneeMast/Insert',
    '160': '/ShipperMast/Delete',
    '161': '/ShipperMast/Edit',
    '162': '/ShipperMast/Insert',
    '163': '/ShipperMast/DeleteKYC',
    '164': '/StockOutward/SaveStock',
    '165': '/StockOutward/DeleteStockOutward',
    '166': '/StockOutward/EditStockOutward'


};

function CheckAjaxUrl(urlCode) {
    Object.keys(AjaxData).forEach(function (key) {
        if (key == urlCode) {
            AjaxTargetUrl = AjaxData[key];
        }
    });
}
function DynamicAjaxMethod(method,data) {
    switch (method) {
        case "DeleteInnerGrdRowSuccess":
            DeleteInnerGrdRowSuccess(data);
            break;
        case "SearchByRefNoSuccess":
            SearchByRefNoSuccess(data);
            break;
        case "CostEntrySuccess":
            CostEntrySuccess(data);
            break;
        case "DeleteSuccess":
            DeleteSuccess(data);
            break;
        case "EditingSuccess":
            EditingSuccess(data);
            break;
        case "DrsAddSuccess":
            DrsAddSuccess(data);
            break;
        case "EditClickSuccess":
            EditClickSuccess(data);
            break;
        case "DocType_EditSuccess":
            DocType_EditSuccess(data);
            break;
        case "BindManiTable":
            BindManiTable(data);
            break;
        case "DocType_DeleteSuccess":
            DocType_DeleteSuccess(data);
            break;
        case "Mani_Scan_Progress_Save":
            Mani_Scan_Progress_Save(data);
            break;
        case "Mani_Scan_EditClickSuccess":
            Mani_Scan_EditClickSuccess(data);
            break;
        case "Mani_Scan_DeleteSuccess":
            Mani_Scan_DeleteSuccess(data);
            break;
        case "SaveDoctype":
            SaveDoctype(data);
            break;
        case "Mani_Scan_ddlVehicle_success":
            Mani_Scan_ddlVehicle_success(data);
            break;
        case "State_Delete":
            State_Delete(data);
            break;
        case "SaveState":
            SaveState(data);
            break;
        case "EditState":
            EditState(data);
            break;
        case "Mani_Scan_ddlDriverSuccess":
            Mani_Scan_ddlDriverSuccess(data);
            break;
        case "Mani_Scan_LocSuccess":
            Mani_Scan_LocSuccess(data);
            break;
        case "Mani_Scan_VendSuccess":
            Mani_Scan_VendSuccess(data);
            break;
        case "Mani_Scan_CheckManiSuccess":
            Mani_Scan_CheckManiSuccess(data);
            break;
        case "Mani_Scan_ManiAddSuccess":
            Mani_Scan_ManiAddSuccess(data);
            break;
        case "Area_Edit":
            Area_Edit(data);
            break;
        case "Mani_Scan_SaveMani":
            Mani_Scan_SaveMani(data);
            break;
        case "Area_Save":
            Area_Save(data);
            break;
        case "Mani_Scan_AddAwbNosSuccess":
            Mani_Scan_AddAwbNosSuccess(data);
            break;
        case "Area_Delete":
            Area_Delete(data);
            break;
        case "Mani_Scan_DeleteManiSuccess":
            Mani_Scan_DeleteManiSuccess(data);
            break;
        case "Loaction_Delete":
            Loaction_Delete(data);
            break;
        case "Location_Edit":
            Location_Edit(data);
            break;
        case "Location_Save":
            Location_Save(data);
            break;
        case "Mani_Scan_UnmanifestList":
            Mani_Scan_UnmanifestList(data);
            break;
        case "Inscan_ValidateDest":
            Inscan_ValidateDest(data);
            break;
        case "Inscan_ValidateProduct":
            Inscan_ValidateProduct(data);
            break;
        case "Inscan_ValidateService":
            Inscan_ValidateService(data);
            break;
        case "Inscan_GetCustNew":
            Inscan_GetCustNew(data);
            break;
        case "Inscan_GetCustomer":
            Inscan_GetCustomer(data);
            break;
        case "Inscan_ValidateCompany":
            Inscan_ValidateCompany(data);
            break;
        case "Inscan_mappingData":
            Inscan_mappingData(data);
            break;
        case "Inscan_PicUpScan":
            Inscan_PicUpScan(data);
            break;
        case "Inscan_Holdmetod":
            Inscan_Holdmetod(data);
            break;
        case "Inscan_GetShipLog":
            Inscan_GetShipLog(data);
            break;
        case "Inscan_DownloadData":
            Inscan_DownloadData(data);
            break;
        case "Inscan_InscanData":
            Inscan_InscanData(data);
            break;
        case "Inscan_GetCust_Vol":
            Inscan_GetCust_Vol(data);
            break;
        case "Inscan_GetDividevalue":
            Inscan_GetDividevalue(data);
            break;
        case "Inscan_CheckAwbNo":
            Inscan_CheckAwbNo(data);
            break;
        case "SalesEx_Save":
            SalesEx_Save(data);
            break;
        case "SalesEx_Edit":
            SalesEx_Edit(data);
            break;
        case "SalesEx_Delete":
            SalesEx_Delete(data);
            break;
        case "Airline_Save":
            Airline_Save(data);
            break;
        case "Airline_Edit":
            Airline_Edit(data);
            break;
        case "Airline_Delete":
            Airline_Delete(data);
            break;
        case "Charges_Save":
            Charges_Save(data);
            break;
        case "Charges_Edit":
            Charges_Edit(data);
            break;
        case "Charges_Delete":
            Charges_Delete(data);
            break;
        case "Company_Save":
            Company_Save(data);
            break;
        case "Company_Edit":
            Company_Edit(data);
            break;
        case "Company_Delete":
            Company_Delete(data);
            break;
        case "Country_Save":
            Country_Save(data);
            break;
        case "Country_Edit":
            Country_Edit(data);
            break;
        case "Country_Delete":
            Country_Delete(data);
            break;
        case "Courier_Save":
            Courier_Save(data);
            break;
        case "Courier_Edit":
            Courier_Edit(data);
            break;
        case "Courier_Delete":
            Courier_Delete(data);
            break;
        case "Instruct_Edit":
            Instruct_Edit(data);
            break;
        case "Instruction_Delete":
            Instruction_Delete(data);
            break;
        case "Driver_Load":
            Driver_Load(data);
            break;
        case "Driver_Delete":
            Driver_Delete(data);
            break;
        case "Instruct_Save":
            Instruct_Save(data);
            break;
        case "Local_Save":
            Local_Save(data);
            break;
        case "Local_Load":
            Local_Load(data);
            break;
        case "LocalADD":
            LocalADD(data);
            break;
        case "Dest_Save":
            Dest_Save(data);
            break;
        case "Dest_Edit":
            Dest_Edit(data);
            break;
        case "Dest_Delete":
            Dest_Delete(data);
            break;
        case "Excp_Save":
            Excp_Save(data);
            break;
        case "Excp_Edit":
            Excp_Edit(data);
            break;
        case "Excp_Delete":
            Excp_Delete(data);
            break;
        case "Expense_Save":
            Expense_Save(data);
            break;
        case "Expense_Edit":
            Expense_Edit(data);
            break;
        case "Expense_Delete":
            Expense_Delete(data);
            break;
        case "freeformDesc_Save":
            freeformDesc_Save(data);
            break;
        case "FreeFormDesc_Edit":
            FreeFormDesc_Edit(data);
            break;
        case "FreeFormDesc_Delete":
            FreeFormDesc_Delete(data);
            break;
        case "ItemMast_Save":
            ItemMast_Save(data);
            break;
        case "ItemMast_Delete":
            ItemMast_Delete(data);
            break;
        case "ItemMast_Edit":
            ItemMast_Edit(data);
            break;
        case "OBCDesc_Save":
            OBCDesc_Save(data);
            break;
        case "OBCDesc_Edit":
            OBCDesc_Edit(data);
            break;
        case "OBCDesc_Delete":
            OBCDesc_Delete(data);
            break;
        case "Product_Save":
            Product_Save(data);
            break;
        case "Product_Edit":
            Product_Edit(data);
            break;
        case "Product_Delete":
            Product_Delete(data);
            break;
        case "checkOriginSucc":
            checkOriginSucc(data);
            break;
        case "AutoJob_Save":
            AutoJob_Save(data);
            break;
        case "AutoJob_Edit":
            AutoJob_Edit(data);
            break;
        case "AutoJob_Delete":
            AutoJob_Delete(data);
            break;
        case "Zone_Save":
            Zone_Save(data);
            break;
        case "Zone_Edit":
            Zone_Edit(data);
            break;
        case "Zone_Delete":
            Zone_Delete(data);
            break;
        case "Flight_Save":
            Flight_Save(data);
            break;
        case "Flight_Edit":
            Flight_Edit(data);
            break;
        case "Flight_Delete":
            Flight_Delete(data);
            break;
        case "BindManifestDetails":
            BindManifestDetails(data);
            break;
        case "BindViewTable":
            BindViewTable(data);
            break;
        case "Group_Save":
            Group_Save(data);
            break;
        case "Group_Delete":
            Group_Delete(data);
            break;
        case "Group_Edit":
            Group_Edit(data);
            break;
        case "Insustry_Save":
            Insustry_Save(data);
            break;
        case "Industry_Edit":
            Industry_Edit(data);
            break;
        case "Insustry_Delete":
            Insustry_Delete(data);
            break;
        case "Holiday_Edit":
            Holiday_Edit(data);
            break;
        case "Holiday_Delete":
            Holiday_Delete(data);
            break;
        case "getcontamtSuccess":
            getcontamtSuccess(data);
            break;
        case "GetLocation_Cust":
            GetLocation_Cust(data);
            break;
        case "Customer_Save":
            Customer_Save(data);
            break
        case "Savecopy_Customer":
            Savecopy_Customer(data);
            break;
        case "Customer_Edit":
            Customer_Edit(data);
            break;
        case "Cust_Validatepin":
            Cust_Validatepin(data);
            break;
        case "Cust_SaveCV":
            Cust_SaveCV(data);
            break;
        case "Cust_DeleteFS":
            Cust_DeleteFS(data);
            break;
        case "Cust_DeleteOC":
            Cust_DeleteOC(data);
            break;
        case "Cust_EditFS":
            Cust_EditFS(data);
            break;
        case "Cust_DeleteCV":
            Cust_DeleteCV(data);
            break;
        case "Cust_EditOC":
            Cust_EditOC(data);
            break;
        case "Cust_EditCV":
            Cust_EditCV(data);
            break;
        case "Cust_searchFS":
            Cust_searchFS(data);
            break;
        case "Cust_SearchOC":
            Cust_SearchOC(data);
            break;
        case "Cust_SearchCV":
            Cust_SearchCV(data);
            break;
        case "Cust_Delete":
            Cust_Delete(data);
            break;
        case "Cust_Save":
            Cust_Save(data);
            break;
        case "Vendor_Save":
            Vendor_Save(data);
            break;
        case "Vendor_Delete":
            Vendor_Delete(data);
            break;
        case "Vendor_Edit":
            Vendor_Edit(data);
            break;
        case "Vendor_SaveFS":
            Vendor_SaveFS(data);
            break;
        case "Vendor_deleteFS":
            Vendor_deleteFS(data);
            break;
        case "Vendor_EditFS":
            Vendor_EditFS(data);
            break;
        case "Vendor_saveOC":
            Vendor_saveOC(data);
            break;
        case "Vendor_SearchOC":
            Vendor_SearchOC(data);
            break;
        case "Vendor_EditOC":
            Vendor_EditOC(data);
            break;
        case "Vendor_DeleteOC":
            Vendor_DeleteOC(data);
            break;
        case "Vendor_SaveCV":
            Vendor_SaveCV(data);
            break;
        case "Vendor_DeleteCV":
            Vendor_DeleteCV(data);
            break;
        case "Vendor_EditCV":
            Vendor_EditCV(data);
            break;
        case "VehicleOwn_Edit":
            VehicleOwn_Edit(data);
            break;
        case "VehicleOwn_Delete":
            VehicleOwn_Delete(data);
            break;
        case "Route_Edit":
            Route_Edit(data);
            break;
        case "Route_Delete":
            Route_Delete(data);
            break;
        case "Route_Search":
            Route_Search(data);
            break;
        case "Route_GetDetails":
            Route_GetDetails(data);
            break;
        case "Consignee_Edit":
            Consignee_Edit(data);
            break;
        case "Cons_Delete":
            Cons_Delete(data);
            break;
        case "Consg_Save":
            Consg_Save(data);
            break;
        case "Shipper_Delete":
            Shipper_Delete(data);
            break;
        case "Shipper_Edit":
            Shipper_Edit(data);
            break;
        case "Shipper_Save":
            Shipper_Save(data);
            break;
        case "Shipper_DeleteKyc":
            Shipper_DeleteKyc(data);
            break;
        case "vehicleSuccess":
            vehicleSuccess(data);
            break;
        case "Cust_SaveOC":
            Cust_SaveOC(data);
            break;
        case "Inscan_Mispickupscan":
            Inscan_Mispickupscan(data);
            break;
        case "StockOutSave":
            StockOutSave(data);
            break;
        case "StockOut_Edit":
            StockOut_Edit(data);
            break;
        case "StockOut_Delete":
            StockOut_Delete(data);
            break;

        default:
            break;
    }
}