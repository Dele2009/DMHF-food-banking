import { Button } from "@heroui/react";
import React, { useRef, useState, useEffect } from "react";
import { generateRandomString } from "../../utils/app/text";
interface CameraCaptureProps {
  onCapture: (dataUrl: string, filename: string) => void;
}
const CameraCapture = ({ onCapture }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    getCameraStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setCapturedImage(dataUrl);
      }
    }
  };

  const saveImage = () => {
    if (capturedImage) {
      const filename = `dmhf-profile-selfie-${generateRandomString()}.png`;
      const link = document.createElement("a");
      link.href = capturedImage;
      link.download = filename;
      link.click();
      onCapture(capturedImage, filename);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {capturedImage ? (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full max-w-md rounded-lg shadow-md"
          />
          <Button onPress={saveImage} color="warning">
            Save & Use Image
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full max-w-md">
            <video
              ref={videoRef}
              autoPlay
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <Button onPress={captureImage} color="success">
            Capture Image
          </Button>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" style={{ display: "none" }} />
    </div>
  );
};

export default CameraCapture;
