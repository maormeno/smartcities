import { Button } from '@mui/material';
import { useState } from 'react';
import ReactLoading from 'react-loading';
import { calculateComplexity } from '../functions/requests';

export function EmergencyComplexity({ id }: { id: number }) {
  const [complexity, setComplexity] = useState<null | number | string>(null);
  const [loading, setLoading] = useState(false);

  const onClickHandler = async () => {
    setLoading(true);
    const result = await calculateComplexity(id);
    setComplexity(result);
    setLoading(false);
  };

  if (complexity === null && !loading) {
    return (
      <Button
        variant="contained"
        onClick={onClickHandler}
        sx={{ width: 10, fontSize: 9 }}
      >
        Calculate
      </Button>
    );
  } else if (loading) {
    return <ReactLoading type={'cylon'} color="black" width="50%" />;
  } else {
    return <>{complexity}</>;
  }
}
