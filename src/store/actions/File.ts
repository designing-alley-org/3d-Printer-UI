import { updateFile } from '../../services/filesService';
import { deleteFromS3, getSignedUrl, uploadFromS3 } from '../../services/s3';
import { FileDataDB, UpdateFileData } from '../../types/uploadFiles';
import { returnResponse, returnS3Key } from '../../utils/function';
import { stlParser, STLUtils } from '../../utils/stlUtils';
// Three js
import * as THREE from 'three';
import { updateThumbnail } from '../customizeFilesDetails/CustomizationSlice';
import toast from 'react-hot-toast';

export const updateFileInCustomization = async (
  fileId: string,
  fileData: Partial<UpdateFileData>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  stlGeometry: THREE.BufferGeometry | null,
  colorHexcode: string | null,
  activeFile: FileDataDB,
  dispatch: any
) => {
  let imageFileKey = '';
  try {
    setIsLoading(true);

    // step : 1 Generate Thumbnail

    const thumbnailDataUrl = await stlParser.generateThumbnail(
      stlGeometry as THREE.BufferGeometry,
      {
        size: 400,
        color: colorHexcode || '#ffffff',
        backgroundColor: 'transparent',
      }
    );

    // step : 2 covert dataUrl to file object

    const thumbnailFile = STLUtils.dataUrlToFile(
      thumbnailDataUrl,
      `${activeFile.fileName}_thumbnail.png`
    );

    // step : 3 get signed url for thumbnail
    const imageSignedUrl = await getSignedUrl(
      thumbnailFile.name,
      'stlImage',
      thumbnailFile.type
    );

    imageFileKey = imageSignedUrl.key;
    const imageUploadUrl = imageSignedUrl.url;

    // step : 4 upload thumbnail to s3
    await uploadFromS3(thumbnailFile, imageUploadUrl, (progress) => {
      console.log(`Thumbnail Upload Progress: ${progress}%`);
    });

    // step : 5 update file with thumbnail url and data from s3
    const response = await updateFile(fileId, {
      ...fileData,
      thumbnailUrl: imageSignedUrl.storeUrl,
    });

    // step : 6 successfully updated so delete old thumbnail from s3
    await deleteFromS3(returnS3Key(activeFile.thumbnailUrl || ''));

    dispatch(
      updateThumbnail({ id: fileId, thumbnailUrl: imageSignedUrl.storeUrl })
    );

    toast.success(activeFile.fileName + ' save successfully');

    return returnResponse(response);
  } catch (error: any) {
    if (imageFileKey) {
      await deleteFromS3(imageFileKey);
    }
    toast.error(error.response?.data?.message);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
