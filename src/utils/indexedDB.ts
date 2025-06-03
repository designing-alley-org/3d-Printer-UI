// src/utils/indexedDB.ts

export const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('FileDatabase', 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('files')) {
        db.createObjectStore('files', { keyPath: 'fileUrl' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveFile = async (fileUrl: string, fileBlob: Blob) => {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('files', 'readwrite');
    const store = transaction.objectStore('files');
    const request = store.put({ fileUrl, fileBlob });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getFile = async (fileUrl: string): Promise<Blob | undefined> => {
  const db = await openDB();
  return new Promise<Blob | undefined>((resolve, reject) => {
    const transaction = db.transaction('files', 'readonly');
    const store = transaction.objectStore('files');
    const request = store.get(fileUrl);

    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result.fileBlob);
      } else {
        resolve(undefined);
      }
    };
    request.onerror = () => reject(request.error);
  });
};


// src/utils/indexedDB.ts

export const clearDB = async () => {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('files', 'readwrite');
    const store = transaction.objectStore('files');
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
