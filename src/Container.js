import React, { useState, useEffect, useRef, Fragment } from 'react';
import Header from './Header';
import Section from './Section';
import List from './List';
import ContainerForm from './ContainerForm';
import axios from 'axios';
import './records.scss';

const sortRecords = (records) =>
  records.sort((a, b) => {
    if (a.recordName < b.recordName) {
      return -1;
    }
    if (a.recordName > b.recordName) {
      return 1;
    }
    return 0;
  });

const Container = ({ setShowApp }) => {
  const [records, setRecords] = useState([]);
  const [liveText, setLiveText] = useState('');
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/records');
      if (isMounted) {
        setRecords(sortRecords(data));
      }
    };

    fetchData();
    // axios.get('api/records').then(({ data }) => {
    //   setRecords(sortRecords(data));
    //   if (isMounted) {
    //     setRecords(sortRecords(data));
    //   }
    // });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const onSubmitHandler = async (entry) => {
    const { data } = await axios.post('/api/records', entry);
    if (isMounted.current) {
      setRecords(sortRecords([...records, data]));
      setLiveText(`${entry.recordName} successfully added`);
    }
  };

  // const onSubmitHandler = (entry) => {

  //   // setRecords(sortRecords([...records, entry]));
  //   // can replace axios with Fetch
  //   axios.post('/api/records', entry).then(({ data }) => {
  //     if (isMounted.current) {
  //       setRecords(sortRecords([...records, data]));
  //       setLiveText(`${entry.recordName} successfully added.`);
  //     }
  //   });
  //   setShowApp(false);
  //   // for screen readers
  //   // setLiveText(`${entry.recordName} successfully added.`);
  // };

  return (
    <Fragment>
      <Header />
      <main>
        <Section headingtext='Add a new favorite'>
          <ContainerForm onSubmit={onSubmitHandler} />
        </Section>
        <Section headingtext='Records'>
          <List records={records} />
        </Section>
      </main>
      <div className='visually-hidden' aria-live='polite' aria-atomic='true'>
        {liveText}
      </div>
    </Fragment>
  );
};

const Wrapper = () => {
  const [showApp, setShowApp] = useState(true);
  return showApp && <Container setShowApp={setShowApp} />;
};

export default Wrapper;
