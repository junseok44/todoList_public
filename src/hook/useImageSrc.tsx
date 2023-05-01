import React, { useState, useEffect } from "react";

interface Props {
  file: Blob | undefined;
}

const useImageSrc = (file: Blob | undefined) => {
  const [imageSrc, setImageSrc] = useState<string>(
    `${process.env.PUBLIC_URL}/japan.jpg`
  );
  // FIXME 여기서 지금 DEFAULT값이 설정되고 있었기 때문에. 렌더링하기전에 일시적으로 유지가 되는듯 하다.

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
