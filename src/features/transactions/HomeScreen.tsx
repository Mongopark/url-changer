import { useState, useEffect } from 'react';
import SectionHeader from './components/SectionHeader.tsx';
import TableHeader from './components/TableHeader.tsx';
import SingleUrl from './components/SingleUrl.tsx';
import { ItemProps, UrlsProps} from './model/type.ts';
import data from './model/urlData.ts';
import Pagination, { PaginationMobile } from './components/Pagination.tsx';
import useBreakpoint from '../../hooks/useBreakpoint.ts';
import CreateUrl from './components/CreateUrl.tsx';
import Header from './components/Header.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import { RootState } from '../../app/store.ts';
// import { saveToken, setUserAuthenticated } from '../auth/slice';
import { useGetUrlsQuery } from '../../app/api.ts';
import Alert from '../../components/Alert.tsx';
import LogoutModal from '../../components/LogoutModal.tsx';
import PasswordModal from '../../components/PasswordModal.tsx';



export default function HomeScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Set the number of items per page
  const isMobile = useBreakpoint('md').isBelowMd;
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [dialog, setDialog] = useState<boolean>(false);
  const varToken = useAppSelector((state: RootState) => state.auth.token);
  const isUserAuthenticated = useAppSelector((state: RootState) => state.auth.isUserAuthenticated);
  const currentUserId = useAppSelector((state: RootState) => state.auth.userId);
  // Destructure the result and specify the type
  const allUrls: any = useGetUrlsQuery<any>();
  //  const [userWallet, { data, isLoading, isError }] = useUserWalletQuery<any>();
  const { data: urlsData, isLoading: urlDataIsLoading, isError: urlDataIsError, isSuccess: urlDataIsSuccess, refetch: urlDataRefetch } = allUrls;   
  const [shortenedUrls, setShortenedUrls] = useState<UrlsProps | undefined>(urlsData);

  
  

  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shortenedUrls?.urls.slice(indexOfFirstItem, indexOfLastItem);
  const [showRegister, setShowRegister] = useState(false);

  const toggleRegister = () => {
    setShowRegister(prevState => !prevState);
  };

  const toggleDialog = () => {
    setDialog(!dialog);
  };


  useEffect(() => {
    setShortenedUrls(urlsData);
  })
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (urlDataIsLoading) {
          setType('loading');
          setDialog(true);
          setMessage('Loading all URLs');
        } else if (urlDataIsSuccess && urlsData?.success) {
          setType(urlsData?.status === 200?'success':'info');
          setDialog(true);
          setMessage(urlsData.message);
          setShortenedUrls(urlsData);
        } else if (urlDataIsError) {
          setType('error');
          setDialog(true);
          setMessage('Error fetching all URLs, check internet and refresh');
          }
      } catch (error) {
        setType('error');
        setDialog(true);
        setMessage(`Unexpected error: ${error}`);
      }
    };
    fetchData();
  }, [urlDataIsSuccess, urlDataIsError, urlsData]);


  

  return (
    <div>
      <Alert type={type} text={message} dialog={dialog} setDialog={toggleDialog} />
      <LogoutModal />
      <PasswordModal />
    {/* The button to open modal */}
      <Header title='YOUR URL CHANGER'/>
      <div className="md:p-5 md:m-5 m-1 p-1">
      <div className='md:ms-3 mt-5'>
    <SectionHeader title='Change Url:'/>
    </div> 
    <div className="md:w-[50%] lg:w-[30%] rounded-[10px] md:px-0 bg-white">
          <div className="w-full">            
              <CreateUrl toggleRegister={toggleRegister} />
          </div>
        </div>

      {/* Table */}
      <div className="flex flex-col m-3 md:m-5" > 
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="w-full divide-y bg-[#EEEAF2] divide-gray-200">
                <TableHeader />           
                <tbody className="bg-white divide-y divide-white-400 text-sm font-semibold">
                  {currentItems?.map((item: ItemProps, index: number) => (
                    <SingleUrl item={item} index={index} key={item._id} />  
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      {/* Pagination Controls */}
      {isMobile?<div className="flex justify-end m-5" style={{marginTop: isMobile?"10px":"70px"}}>
        <PaginationMobile data={urlsData?.urls} currentPage={currentPage} setCurrentPage={setCurrentPage}/></div>
        :<div className="flex justify-end m-5" style={{marginTop: isMobile?"10px":"70px"}}>
        <Pagination data={urlsData?.urls} currentPage={currentPage} setCurrentPage={setCurrentPage}/></div>}
    </div>
    </div>
  );
}
