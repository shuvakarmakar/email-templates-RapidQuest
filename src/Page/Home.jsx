import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import { useDropzone } from "react-dropzone";

const Home = () => {
    const [layoutHTML, setLayoutHTML] = useState("");
    const [emailConfig, setEmailConfig] = useState({
        title: "",
        content: "",
        footer: "",
        imageUrl: "",
    });
    const [uploadedImage, setUploadedImage] = useState("");

    // Fetch layout from backend
    useEffect(() => {
        axios
            .get("/getEmailLayout")
            .then((response) => setLayoutHTML(response.data))
            .catch((error) => console.error("Error fetching layout:", error));
    }, []);

    // Image Upload Handling
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            const formData = new FormData();
            formData.append("file", acceptedFiles[0]);

            axios
                .post("/uploadImage", formData)
                .then((response) => {
                    setUploadedImage(response.data.url);
                    setEmailConfig({ ...emailConfig, imageUrl: response.data.url });
                })
                .catch((error) => console.error("Error uploading image:", error));
        },
    });

    // Handle text field changes
    const handleInputChange = (field, value) => {
        setEmailConfig({ ...emailConfig, [field]: value });
    };

    // Submit Email Config
    const handleSubmit = () => {
        axios
            .post("/uploadEmailConfig", emailConfig)
            .then((response) => alert("Configuration saved successfully!"))
            .catch((error) => console.error("Error saving configuration:", error));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Email Builder</h1>

            {/* Layout Display */}
            <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-lg font-semibold mb-2">Base Layout Preview</h2>
                <div
                    className="border p-4 rounded"
                    dangerouslySetInnerHTML={{ __html: layoutHTML }}
                ></div>
            </div>

            {/* Editable Fields */}
            <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-lg font-semibold mb-2">Edit Email Fields</h2>

                {/* Title Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        value={emailConfig.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="border w-full p-2 rounded"
                    />
                </div>

                {/* Content Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                        Content
                    </label>
                    <ReactQuill
                        value={emailConfig.content}
                        onChange={(value) => handleInputChange("content", value)}
                    />
                </div>

                {/* Footer Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                        Footer
                    </label>
                    <input
                        type="text"
                        value={emailConfig.footer}
                        onChange={(e) => handleInputChange("footer", e.target.value)}
                        className="border w-full p-2 rounded"
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">
                        Upload Image
                    </label>
                    <div
                        {...getRootProps()}
                        className="border-dashed border-2 border-gray-400 p-4 rounded cursor-pointer text-center"
                    >
                        <input {...getInputProps()} />
                        {uploadedImage ? (
                            <img
                                src={uploadedImage}
                                alt="Uploaded"
                                className="max-w-full h-32 mx-auto"
                            />
                        ) : (
                            <p>Drag & drop an image, or click to select one</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Save Configuration
            </button>
        </div>
    );
};

export default Home;
