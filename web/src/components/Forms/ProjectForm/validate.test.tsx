import validate from './validate';
import { AddProjectParams } from './AddProjectParams.d';
import { FormErrors } from 'redux-form';
import { ProjectFormProps } from './ProjectTestData';

describe('Project Form Validation', () => {
  describe('Checking required fields', () => {
    let error: FormErrors<AddProjectParams>;
    
    it('Complete form validation', () => {
      const expectedProps = { ...ProjectFormProps};
      error = validate(expectedProps);
      expect(error).toEqual({});
    });

    it('Project name is required', () => {
      const expectedProps = { ...ProjectFormProps, ...{ projectName: '' } };
      error = validate(expectedProps);
      expect(error.projectName).toBeDefined();
    });
    /*
        it('Company name is required',()=>{
            expect(error.companyName).toBeDefined(); 
        });
        it('Contract name is required',()=>{
            expect(error.contractName).toBeDefined(); 
        });
        it('Head of project name is required',()=>{
            expect(error.projectHead).toBeDefined(); 
        });
        it('Project owner is required',()=>{
            expect(error.projectOwner).toBeDefined(); 
        });
        it('Project manager name is required',()=>{
            expect(error.projectManager).toBeDefined(); 
        });

        it('Project scope is required',()=>{
            expect(error.projectScope).toBeDefined(); 
        });
        it('Project status is required',()=>{
            expect(error.projectStatus).toBeDefined(); 
        });
        it('Country name is required',()=>{
            expect(error.country).toBeDefined(); 
        });
        it('Probability of winning is required',()=>{
            expect(error.winProbabilty).toBeDefined(); 
        });
        it('Currency is required',()=>{
            expect(error.currency).toBeDefined(); 
        });
        it('Approximate value is required',()=>{
            expect(error.approxValue).toBeDefined(); 
        });
        it('Contract type is required',()=>{
            expect(error.contractType).toBeDefined(); 
        });
        it('CDM notifiable is required',()=>{
            expect(error.cdmNotify).toBeDefined(); 
        });
        it('Asset is required (First)',()=>{
            expect(error.assetworkedonprimary).toBeDefined(); 
        });
        it('Asset is required (Second)',()=>{
            expect(error.assetworkedonsecond).toBeDefined(); 
        });
        it('Asset is required (Third)',()=>{
            expect(error.assetworkedonthird).toBeDefined(); 
        });
        */
  });
});
