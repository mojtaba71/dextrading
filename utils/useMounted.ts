import { useEffect, useState } from "react"

export const useMounted = () => {
  const [m, setM] = useState(false);

  useEffect(() => {
    setM(true);
  }, [])

  return m;
}