import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function useUniqueId() {
  const [uniqueId] = useState(() => uuidv4());
  return uniqueId;
}

export default useUniqueId;
