import React, { useState, useEffect } from "react";

interface Props {
  file: Blob | undefined;
}

const useImageSrc = (file: Blob | undefined) => {
  const [imageSrc, setImageSrc] = useState<string | null>(
    file ? null : process.env.PUBLIC_URL + "/japan.jpg"
  );

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [file]);

  return { imageSrc };
};

export default useImageSrc;
