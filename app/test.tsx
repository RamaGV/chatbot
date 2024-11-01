'use client'
import React, { useState } from "react";
import { FiSearch, FiMoreVertical, FiSend, FiPaperclip, FiMic, FiPhone, FiMail, FiStar, FiVideo, FiFile, FiImage, FiPlus, FiMessageCircle, FiCpu, FiEdit3, FiMoreHorizontal, FiArrowLeft, FiRefreshCw, FiEdit, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ChatApp = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [customResponse, setCustomResponse] = useState("");
  const [generatedResponses, setGeneratedResponses] = useState([]);
  const [contextReason, setContextReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [showEditButtons, setShowEditButtons] = useState(false);

  const contacts = [
    {
      id: 1,
      name: "General Chat",
      avatar: "images.unsplash.com/photo-1573547429441-d7ef62e04b0e",
      status: "active",
      unread: 3,
      isGroup: true
    },
    {
      id: 2,
      name: "Sarah Wilson",
      avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330",
      status: "online",
      unread: 2,
      designation: "Product Designer"
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "images.unsplash.com/photo-1599566150163-29194dcaad36",
      status: "offline",
      unread: 0,
      designation: "Developer"
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 2,
      text: "Hey, how's the new project going?",
      timestamp: "09:30 AM",
      type: "text"
    },
    {
      id: 2,
      senderId: "me",
      text: "It's going well! Just finished the main feature.",
      timestamp: "09:32 AM",
      type: "text"
    },
    {
      id: 3,
      senderId: 2,
      text: "images.unsplash.com/photo-1517694712202-14dd9538aa97",
      timestamp: "09:35 AM",
      type: "image"
    }
  ];

  const sharedFiles = [
    {
      id: 1,
      name: "Project_Brief.pdf",
      type: "pdf",
      size: "2.5 MB"
    },
    {
      id: 2,
      name: "Design_Assets.zip",
      type: "zip",
      size: "15 MB"
    }
  ];

  const handleRequestAI = () => {
    try {
      setGeneratedResponses([
        "I've reviewed the project details and would be happy to help with the implementation.",
        "Based on our previous discussion, I can provide guidance on the technical requirements.",
        "Let's schedule a call to discuss the project scope in more detail."
      ]);
      setShowEditButtons(false);
      setSelectedResponse(null);
    } catch (error) {
      setErrorMessage("Lo sentimos, ha ocurrido un error al procesar su solicitud.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleResponseSelection = (response) => {
    setSelectedResponse(response);
    setShowEditButtons(true);
  };

  const handleEditResponse = () => {
    setCustomResponse(selectedResponse);
    setShowResponseInput(true);
    setShowEditButtons(false);
  };

  const handleRequestVariant = () => {
    const variants = [
      `Alternative version: ${selectedResponse}`,
      `Different approach: ${selectedResponse}`,
      `New perspective: ${selectedResponse}`
    ];
    setGeneratedResponses(variants);
    setShowEditButtons(false);
    setSelectedResponse(null);
  };

  const handleSendResponse = () => {
    console.log("Sending response:", selectedResponse);
    setShowEditButtons(false);
    setSelectedResponse(null);
    setGeneratedResponses([]);
  };

  const ActionButton = () => {
    return (
      <motion.div className="absolute bottom-6 right-6 z-50">
        <motion.div
          className="relative"
          initial={false}
          animate={isActionMenuOpen ? "open" : "closed"}
        >
          <AnimatePresence>
            {showEditButtons && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-16 right-0 space-y-2"
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
                    onClick={() => setShowResponseInput(true)}
                    className="w-full flex items-center p-3 space-x-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FiEdit3 className="text-green-500 w-5 h-5" />
                    <span className="text-gray-700">Write Response</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowResponseInput("contextual")}
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
              if (showEditButtons) {
                setShowEditButtons(false);
                setSelectedResponse(null);
              } else if (generatedResponses.length) {
                setGeneratedResponses([]);
              } else {
                setIsActionMenuOpen(!isActionMenuOpen);
              }
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform -skew-x-6"
          >
            <motion.div
              animate={{
                rotate: isActionMenuOpen || showEditButtons ? 180 : 0
              }}
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

  return (
    <div className="flex h-screen bg-gray-100 relative">
        {errorMessage && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
              {errorMessage}
          </div>
      )}
      
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar contactos"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={`https://${contact.avatar}`}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e";
                    }}
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${contact.status === "online" ? "bg-green-500" : "bg-gray-400"} border-2 border-white`}
                  ></span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.designation}</p>
                </div>
                {contact.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>






      {/* Chat View */}
      <div className="flex-1 flex flex-col relative">
        {selectedContact ? (
          <>
            <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={`https://${selectedContact.avatar}`}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e";
                  }}
                />
                <div>
                  <h2 className="font-semibold">{selectedContact.name}</h2>
                  <p className="text-sm text-gray-500">{selectedContact.status}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <FiPhone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <FiVideo className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <FiMoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${msg.senderId === "me" ? "bg-blue-500 text-white" : "bg-white"}`}
                  >
                    {msg.type === "text" ? (
                      <p>{msg.text}</p>
                    ) : (
                      <img
                        src={`https://${msg.text}`}
                        alt="Shared image"
                        className="rounded-lg max-w-full"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e";
                        }}
                      />
                    )}
                    <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                  </div>
                </div>
              ))}

              <AnimatePresence>
                {generatedResponses.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="space-y-2"
                  >
                    {generatedResponses.map((response, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer max-w-[70%] ${selectedResponse === response ? "border-2 border-blue-500" : ""}`}
                        onClick={() => handleResponseSelection(response)}
                      >
                        <p>{response}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ActionButton />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Seleccione un contacto para comenzar a chatear</p>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      {selectedContact && (
        <div className="w-80 bg-white border-l border-gray-200 p-4">
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
      )}
    </div>
  );
};

export default ChatApp;
