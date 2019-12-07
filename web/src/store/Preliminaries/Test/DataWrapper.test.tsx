import { bindUserData,convertIntoDatabaseModel } from '../DataWrapper';
import {lookupData,preliminariesData,preliminariuserData} from "./ReducerTestData";
describe('DataWrapper test cases', () => {
    it('should bind preliminaries database data into user format', () => {
     sessionStorage.setItem("lookupData",JSON.stringify(lookupData));
     expect(bindUserData(preliminariesData)).not.toBeNull();
     expect(bindUserData(preliminariesData)).toHaveLength(1);
    });
    it('should bind user format into database format', () => {
        sessionStorage.setItem("lookupData",JSON.stringify(lookupData));
        let projectId:string="4d27e2e1-843d-435a-b27c-03dca70ce232";
        expect(convertIntoDatabaseModel(preliminariuserData,projectId)).not.toBeNull();
        expect(convertIntoDatabaseModel(preliminariuserData,projectId)).toHaveLength(1);
       });
  });
      
