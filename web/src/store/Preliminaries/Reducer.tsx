import { ActionType } from './Types/ActionType';
import { updateObject } from '../../helpers/utility-helper';
import { IPreliminaryState } from './Types/IPreliminaryState';
import Notify from '../../enums/Notify';
import { IPreliminariesComponentDetails } from './Types/IPreliminariesComponentDetails';
import { IPreliminariesItemDetails } from './Types/IPreliminariesItemDetails';
import { IPreliminariesItems } from './Types/IPreliminariesItems';
const initialState: IPreliminaryState = {
    preliminaryDetails: [
      {
        componentId: '1',
        componentName: 'H & S File Production',
        items: [
          {
            itemId: '1',
            itemName: 'Sub-Contractor',
              preliminaryId:'',
              nameOfSupplier: 'Rishav',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
            
          },
          {
            itemId: '2',
            itemName: 'Lump Sum Allowance',
            preliminaryId:'',
              nameOfSupplier: 'Rishav2',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          },
          {
            itemId: '3',
            itemName: 'CBRE Labour',
            preliminaryId:'',
              nameOfSupplier: 'Rishav3',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          },
          {
            itemId: '4',
            itemName: 'Agency Labour',
            preliminaryId:'',
              nameOfSupplier: 'Rishav4',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          }
        ]
      },
      {
        componentId: '2',
        componentName: 'Site Setup',
        items: [
          {
            itemId: '1',
            itemName: 'Sub-Contractor',
            preliminaryId:'',
              nameOfSupplier: 'Rishav',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          },
          {
            itemId: '2',
            itemName: 'Lump Sum Allowance',
            preliminaryId:'',
              nameOfSupplier: 'Rishav2',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          },
          {
            itemId: '3',
            itemName: 'CBRE Labour',
            preliminaryId:'',
              nameOfSupplier: 'Rishav3',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          },
          {
            itemId: '4',
            itemName: 'Agency Labour',
            preliminaryId:'',
              nameOfSupplier: 'Rishav4',
              noOfHours: 1,
              hourRate: 1,
              totalCost: 1,
              grossMargin: 1,
              comments: 'string'
          }
        ]
      }
    ],
  projectId: ''
};
const preliminaryAddSuccess = (oldState, action) => {
 
};
const preliminaryAddError = (oldState, action) => {
  return updateObject(oldState, { });
};
const preliminaryEditSuccess = (oldState, action) => {
  return updateObject(oldState ,{ });
};
const preliminaryEditError = (oldState, action) => {
  return updateObject(oldState, {});
};
const preliminaryGetSuccess = (oldState, action) => {
  var preData=action.payload;
  for(let i=0;i<preData.length;i++)
  {
    
  }
};
const preliminaryGetError = (oldState, action) => {
  return updateObject(oldState,{});
};
const lookUpDetails = (oldState, action) => {
 var preliminaryDetails:Array<IPreliminariesComponentDetails>=[];
 var componentDetails:IPreliminariesComponentDetails={componentId:'',componentName:'',items:[]}
 var items:IPreliminariesItems ={
  itemId: '',
  itemName: '',
  preliminaryId:'',
  nameOfSupplier: '',
  noOfHours: 0,
  hourRate: 0,
  totalCost: 0,
  grossMargin: 0,
  comments: ''
}
var pre_components=action.payload.filter((data)=>{return data.LookupItem=='Pre_Components'});
var pre_component_items=action.payload.filter((data)=>{return data.LookupItem=='Pre_Component_Items'});
for(let i=0;i<pre_components.length;i++)
{
  componentDetails.componentId=pre_components[i].LookupKey;
  componentDetails.componentName=pre_components[i].Description;
for(let j=0;j<pre_component_items.length;j++)
{
  items.itemId=pre_component_items[j].LookupKey;
  items.itemName=pre_component_items[j].Description;
  componentDetails.items.push(items);
}
preliminaryDetails.push(componentDetails);
}
return updateObject(oldState, {
  preliminaryDetails: preliminaryDetails
});
};
const preliminaryReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case ActionType.PRELIMINARY_ADD_SUCCESS:
      return preliminaryAddSuccess(oldState, action);
    case ActionType.PRELIMINARY_ADD_ERROR:
      return preliminaryAddError(oldState, action);
    case ActionType.PRELIMINARY_EDIT_SUCCESS:
      return preliminaryEditSuccess(oldState, action);
    case ActionType.PRELIMINARY_EDIT_SUCCESS:
      return preliminaryEditError(oldState, action);
    case ActionType.GET_PRELIMINARY_SUCCESS:
      return preliminaryGetSuccess(oldState, action);
    case ActionType.GET_PRELIMINARY_ERROR:
      return preliminaryGetError(oldState, action);
      case ActionType.GET_LOOKUP_DETAILS:
        return lookUpDetails(oldState, action);
    default:
      return oldState;
  }
};
export default preliminaryReducer;
