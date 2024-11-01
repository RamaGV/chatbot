// app/chatapp/components/RightSidebar.tsx
import React from 'react';
import { FiFile } from 'react-icons/fi';

const RightSidebar = ({ sharedFiles }: { sharedFiles: any[] }) => {

  return (
    <div className="w-1/4 border-l  p-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Archivos compartidos</h3>
          <div className="space-y-2">
            {sharedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <FiFile className="w-5 h-5 text-gray-500 mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
