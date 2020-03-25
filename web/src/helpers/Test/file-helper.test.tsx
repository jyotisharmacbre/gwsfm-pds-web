import * as FileSaver from 'file-saver';
import { exportToExcel } from "../file-helper";

describe('file-helper functions run without error', () => {
    const fileSaver = jest.spyOn(FileSaver, 'saveAs').mockImplementation((data, filename) => {
        return filename;
    });
    it('should call the file save function', () => {
        exportToExcel(new Array(), 'filename');
        expect(fileSaver).toHaveBeenCalledTimes(1);
    });

});
