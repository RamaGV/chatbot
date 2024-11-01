// app/chatapp/components/ActionButton.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMoreHorizontal,
  FiArrowLeft,
  FiCheck,
  FiEdit,
  FiRefreshCw,
  FiCpu,
  FiEdit3,
  FiMessageCircle,
} from 'react-icons/fi';

const handleButtonClick = () => {
  // Aquí puedes agregar el código que desees ejecutar cuando se haga clic en el botón
};

const ActionButton = ({
  isActionMenuOpen,
  setIsActionMenuOpen,
  showEditButtons,
  generatedResponses,
  selectedResponse,
  handleRequestAI,
  handleSendResponse,
  handleEditResponse,
  handleRequestVariant,
  setShowEditButtons,
  setSelectedResponse,
  setGeneratedResponses,
}) => {
  return (
    <motion.div className="absolute bottom-6 right-6 z-50">
      <motion.div
        className="relative "
        animate={isActionMenuOpen ? 'open' : 'closed'}
      >
        <AnimatePresence>
          {showEditButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className=" absolute bottom-16 right-0 space-y-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendResponse}
                className="bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center w-12 h-12"
              >
                <FiCheck className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditResponse}
                className="bg-green-500 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center w-12 h-12"
              >
                <FiEdit className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRequestVariant}
                className="bg-purple-500 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center w-12 h-12"
              >
                <FiRefreshCw className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
          
          {isActionMenuOpen && !generatedResponses.length && !showEditButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl w-64 overflow-hidden transform -skew-x-6"
            >
              <motion.div className="p-2 space-y-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRequestAI}
                  className="w-full flex items-center p-3 space-x-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FiCpu className="text-blue-500 w-5 h-5" />
                  <span className="text-gray-700">AI Response</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleButtonClick}
                  className="w-full flex items-center p-3 space-x-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FiEdit3 className="text-green-500 w-5 h-5" />
                  <span className="text-gray-700">Write Response</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleButtonClick}
                  className="w-full flex items-center p-3 space-x-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FiMessageCircle className="text-purple-500 w-5 h-5" />
                  <span className="text-gray-700">Generate Options</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (isActionMenuOpen) {
              // Mostrar menú de edición
              
              setIsActionMenuOpen(!isActionMenuOpen);
              setShowEditButtons(false);
              setSelectedResponse(null);
              setGeneratedResponses([]);
            } else if (showEditButtons) {
              // Cerrar menú de edición y mostrar respuestas generadas
              
              setShowEditButtons(false);
              setIsActionMenuOpen(!isActionMenuOpen);
              setSelectedResponse(null);
            } else if (generatedResponses.length > 0) {
              // Limpiar respuestas generadas y mostrar menú inicial
              
              setGeneratedResponses([]);
              setShowEditButtons(false);
              setIsActionMenuOpen(true);
              setSelectedResponse(null);
            } else {
              setIsActionMenuOpen(!isActionMenuOpen);
            }
          }}

          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform -skew-x-6"
        >
          <motion.div
            animate={{ rotate: isActionMenuOpen || showEditButtons ? 180 : -180 }}
            transition={{ duration: 0.3 }}
          >
            {showEditButtons || generatedResponses.length ? (
              <FiArrowLeft className="w-6 h-6" />
            ) : (
              <FiMoreHorizontal className="w-6 h-6" />
            )}
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ActionButton;
