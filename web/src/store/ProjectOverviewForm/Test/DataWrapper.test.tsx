import { setupInitialApprovalData } from '../DataWrapper';
import { payload } from './DataWrapperTestData';
import { ProjectApproverType } from '../Types/ProjectApprovalEnums';
describe('DataWrapper test cases', () => {
    it('should return project Approval initial array by given payload', () => {
        let initialData = setupInitialApprovalData(payload);
        expect(initialData).not.toBeNull();
        expect(initialData).toHaveLength(11);
    });
    it('should return project Approvals with BUL authorised header hidden and ComM header visible', () => {
        let initialData = setupInitialApprovalData(payload);
        expect(initialData.find(x => x.approverType == ProjectApproverType.ComM).showRangeLabel).toBeTruthy();
        expect(initialData.find(x => x.approverType == ProjectApproverType.BUL).showRangeLabel).toBeFalsy();
    });
});

