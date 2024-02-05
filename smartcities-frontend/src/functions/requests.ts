import axios from 'axios';

interface Data {
  id: number;
  type: string;
  lat: number;
  lon: number;
  location: string;
  message: string;
  level: string;
}

function createData(
  id: number,
  type: string,
  lat: number,
  lon: number,
  location: string,
  message: string,
  level: string
): Data {
  return { id, type, lat, lon, location, message, level };
}

export const getEmergencies = async (page: number): Promise<Data[]> => {
  try {
    const response = await axios.get(
      // 'http://org.emergencies.ml/api/emergencies',
      // `http://localhost:8000/api/emergencies?page_number=${page}`,
      `https://api.emergencies.ml/emergencies?page_number=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    let rows: Data[] = [];
    let emergencies = response.data.emergencies;

    for (let i = 0; i < emergencies.length; i++) {
      rows.push(
        createData(
          emergencies[i].id,
          emergencies[i].type,
          emergencies[i].lat,
          emergencies[i].lon,
          emergencies[i].location,
          emergencies[i].message,
          emergencies[i].level
        )
      );
    }
    return rows;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const calculateComplexity = async (
  emergency_id: number
): Promise<number | string> => {
  try {
    console.log(emergency_id);
    const response = await axios.post(
      // `http://org.emergencies.ml/api/emergencies/${emergency_id}/complexity`,
      // `http://localhost:8000/api/emergencies/${emergency_id}/complexity`,
      `https://api.emergencies.ml/emergencies/${emergency_id}/complexity`,
      // `https://api.emergencies.ml/emergencies/${emergency_id}/calculate-complexity`,
      {
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        },
      }
    );
    console.log(response);
    return response.data.result;
  } catch (error) {
    console.log(error);
    return 'error';
  }
};
