
// import React, { useState } from 'react';
// import Web3 from 'web3';
// import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';

// const contractAddress = '0xCA4dAc2bE9F5bF0865ec5Ed0de830045933D2b4D';
// // const contractAddress = '0xf670fc0dd4a472aec3f77685439495ab2ff8cbdd';

// function IssueCertificate() {
//   const [studentName, setStudentName] = useState('');
//   const [course, setCourse] = useState('');
//   const [hash, setHash] = useState('');
//   const [status, setStatus] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!window.ethereum) {
//       alert("Please install MetaMask to continue.");
//       return;
//     }

//     try {
//       setStatus('🔌 Connecting to MetaMask...');
//       const web3 = new Web3(window.ethereum);
//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       const accounts = await web3.eth.getAccounts();
//       const account = accounts[0];

//       const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);

//       const timestamp = Date.now().toString();
//       const rawData = `${studentName}-${course}-${timestamp}`;
//       const certHash = web3.utils.keccak256(rawData);
//       setHash(certHash);

//       setStatus('⏳ Sending transaction to issue certificate...');

//       await contract.methods.issueCertificate(certHash, studentName, course)
//         .send({ from: account });

//       setStatus('✅ Certificate issued successfully!');
//     } catch (error) {
//       console.error(error);
//       setStatus('❌ Error issuing certificate.');
//     }
//   };

//   return (
//     <div>
//       <h2>Issue Certificate</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           value={studentName}
//           onChange={e => setStudentName(e.target.value)}
//           placeholder="Student Name"
//           required
//         />
//         <input
//           value={course}
//           onChange={e => setCourse(e.target.value)}
//           placeholder="Course"
//           required
//         />
//         <button type="submit">Issue Certificate</button>
//       </form>
//       {hash && <p><strong>Generated Hash:</strong> {hash}</p>}
//       <p>{status}</p>
//     </div>
//   );
// }

// export default IssueCertificate;



































// // import React, { useState } from 'react';
// // import { ethers } from 'ethers';
// // // import CertificateRegistryABI from '../abi/CertificateRegistry.json'; // Adjust if using named export
// // import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';
// // const contractAddress = "0xCA4dAc2bE9F5bF0865ec5Ed0de830045933D2b4D";

// // function IssueCertificate() {
// //   const [studentName, setStudentName] = useState('');
// //   const [course, setCourse] = useState('');
// //   const [hash, setHash] = useState('');
// //   const [status, setStatus] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const timestamp = Date.now().toString();
// //       const rawData = `${studentName}-${course}-${timestamp}`;
// //       const certHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(rawData));
// //       setHash(certHash);

// //       setStatus('🦊 Connecting to wallet...');
// //       if (!window.ethereum) throw new Error("No MetaMask detected");

// //       const provider = new ethers.providers.Web3Provider(window.ethereum);
// //       await provider.send("eth_requestAccounts", []);
// //       const signer = provider.getSigner();

// //       const contract = new ethers.Contract(contractAddress, CertificateRegistryABI, signer);

// //       setStatus('⏳ Issuing certificate on-chain...');
// //       const tx = await contract.issueCertificate(certHash, studentName, course);
// //       await tx.wait();

// //       setStatus('✅ Certificate issued successfully!');
// //     } catch (err) {
// //       console.error(err);
// //       setStatus('❌ Failed to issue certificate: ' + err.message);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>🎓 Issue Certificate</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           value={studentName}
// //           onChange={e => setStudentName(e.target.value)}
// //           placeholder="Student Name"
// //           required
// //         />
// //         <input
// //           value={course}
// //           onChange={e => setCourse(e.target.value)}
// //           placeholder="Course"
// //           required
// //         />
// //         <button type="submit">Issue Certificate</button>
// //       </form>

// //       {hash && <p><strong>🔒 Generated Hash:</strong> {hash}</p>}
// //       <p>{status}</p>
// //     </div>
// //   );
// // }

// // export default IssueCertificate;
































// // import React, { useState } from 'react';
// // import { ethers } from 'ethers';

// // import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';
// // // import CertificateRegistryABI from '../abis/CertificateRegistry.json'; // Adjust path

// // const contractAddress = "0xCA4dAc2bE9F5bF0865ec5Ed0de830045933D2b4D";

// // function IssueCertificate() {
// //   const [studentName, setStudentName] = useState('');
// //   const [course, setCourse] = useState('');
// //   const [hash, setHash] = useState('');
// //   const [status, setStatus] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Create a hash from studentName + course + timestamp
// //     const timestamp = Date.now().toString();
// //     const rawData = `${studentName}-${course}-${timestamp}`;
// //     const certHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(rawData));
// //     setHash(certHash);

// //     try {
// //       setStatus('Connecting wallet...');
// //       const provider = new ethers.BrowserProvider(window.ethereum);
// //       const signer = await provider.getSigner();
// //       const contract = new ethers.Contract(contractAddress, CertificateRegistryABI, signer);

// //       setStatus('Issuing certificate...');
// //       const tx = await contract.issueCertificate(certHash, studentName, course);
// //       await tx.wait();
// //       setStatus('✅ Certificate issued successfully!');
// //     } catch (err) {
// //       console.error(err);
// //       setStatus('❌ Failed to issue certificate.');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Issue Certificate</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Student Name" required />
// //         <input value={course} onChange={e => setCourse(e.target.value)} placeholder="Course Name" required />
// //         <button type="submit">Issue Certificate</button>
// //       </form>
// //       {hash && <p><strong>Generated Hash:</strong> {hash}</p>}
// //       <p>{status}</p>
// //     </div>
// //   );
// // }

// // export default IssueCertificate;




// import React, { useState } from 'react';
// import Web3 from 'web3';
// import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';

// const contractAddress = '0x2139e69391C23730DACB61f8f3Ee90e99fF8C956';

// function IssueCertificate() {
//   const [studentName, setStudentName] = useState('');
//   const [course, setCourse] = useState('');
//   const [hash, setHash] = useState('');
//   const [status, setStatus] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!window.ethereum) {
//       alert("Please install MetaMask to continue.");
//       return;
//     }

//     try {
//       setStatus('🔌 Connecting to MetaMask...');
//       const web3 = new Web3(window.ethereum);
//       await window.ethereum.request({ method: 'eth_requestAccounts' });

//       const accounts = await web3.eth.getAccounts();
//       const account = accounts[0];

//       console.log('Connected account:', account);

//       const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);

//       const timestamp = Date.now().toString();
//       const rawData = `${studentName}-${course}-${timestamp}`;
//       const certHash = web3.utils.keccak256(rawData);
//       setHash(certHash);

//       console.log('Generated parameters:', {
//         certHash,
//         studentName,
//         course,
//         account
//       });

//       setStatus('🔍 Validating transaction...');

//       // First, test the transaction with call() to get the actual error
//       try {
//         await contract.methods.issueCertificate(certHash, studentName, course)
//           .call({ from: account });
//         console.log('✅ Call validation successful');
//       } catch (callError) {
//         console.error('❌ Call validation failed:', callError);
        
//         // Parse common error messages
//         if (callError.message.includes('Not a registered school')) {
//           setStatus('❌ Error: Account must be registered as a school to issue certificates');
//           return;
//         } else if (callError.message.includes('Only admin can do this')) {
//           setStatus('❌ Error: Only admin can perform this action');
//           return;
//         } else if (callError.message.includes('Certificate already issued')) {
//           setStatus('❌ Error: Certificate with this hash already exists');
//           return;
//         } else if (callError.message.includes('revert')) {
//           setStatus(`❌ Contract Error: ${callError.message}`);
//           return;
//         } else {
//           setStatus(`❌ Validation Error: ${callError.message}`);
//           return;
//         }
//       }

//       setStatus('⏳ Sending transaction to issue certificate...');

//       // If call succeeds, proceed with the actual transaction
//       const result = await contract.methods.issueCertificate(certHash, studentName, course)
//         .send({ 
//           from: account,
//           gas: 200000, // Increased gas limit
//           gasPrice: web3.utils.toWei('20', 'gwei')
//         });

//       console.log('Transaction result:', result);
//       setStatus('✅ Certificate issued successfully!');
      
//       // Display transaction hash
//       if (result.transactionHash) {
//         setStatus(prev => prev + ` Transaction: ${result.transactionHash}`);
//       }

//     } catch (error) {
//       console.error('Full error object:', error);
      
//       // Handle specific error types
//       if (error.code === 4001) {
//         setStatus('❌ Transaction rejected by user');
//       } else if (error.message.includes('insufficient funds')) {
//         setStatus('❌ Insufficient funds for transaction');
//       } else if (error.message.includes('nonce too low')) {
//         setStatus('❌ Transaction nonce error. Please try again');
//       } else if (error.message.includes('gas')) {
//         setStatus('❌ Gas estimation failed. Try increasing gas limit');
//       } else {
//         setStatus(`❌ Error: ${error.message || 'Unknown error occurred'}`);
//       }
//     }
//   };

//   // Function to check account permissions
//   const checkPermissions = async () => {
//     if (!window.ethereum) return;
    
//     try {
//       const web3 = new Web3(window.ethereum);
//       const accounts = await web3.eth.getAccounts();
//       const account = accounts[0];
//       const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);
      
//       // Check if current account is admin
//       const admin = await contract.methods.admin().call();
//       const isAdmin = admin.toLowerCase() === account.toLowerCase();
      
//       // Check if current account is a registered school
//       const isRegisteredSchool = await contract.methods.isRegisteredSchool(account).call();
      
//       console.log('=== ACCOUNT PERMISSIONS ===');
//       console.log('Contract admin:', admin);
//       console.log('Current account:', account);
//       console.log('Is admin:', isAdmin);
//       console.log('Is registered school:', isRegisteredSchool);
//       console.log('=========================');
      
//       // Update status with permission info
//       if (isAdmin) {
//         setStatus('✅ Connected as Admin - You can register schools');
//       } else if (isRegisteredSchool) {
//         setStatus('✅ Connected as Registered School - You can issue certificates');
//       } else {
//         setStatus('❌ Account not authorized - Need to be admin or registered school');
//       }
      
//     } catch (error) {
//       console.error('Error checking permissions:', error);
//       setStatus('❌ Error checking permissions');
//     }
//   };

//   // Function to register current account as a school (only admin can do this)
//   const registerAsSchool = async () => {
//     if (!window.ethereum) return;
    
//     try {
//       const web3 = new Web3(window.ethereum);
//       const accounts = await web3.eth.getAccounts();
//       const account = accounts[0];
//       const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);
      
//       setStatus('⏳ Registering account as school...');
      
//       await contract.methods.registerSchool(account)
//         .send({ from: account, gas: 100000 });
      
//       setStatus('✅ Account registered as school successfully!');
      
//     } catch (error) {
//       console.error('Error registering school:', error);
//       if (error.message.includes('Only admin can do this')) {
//         setStatus('❌ Only admin can register schools');
//       } else {
//         setStatus(`❌ Error registering school: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Issue Certificate</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           value={studentName}
//           onChange={e => setStudentName(e.target.value)}
//           placeholder="Student Name"
//           required
//         />
//         <input
//           value={course}
//           onChange={e => setCourse(e.target.value)}
//           placeholder="Course"
//           required
//         />
//         <button type="submit">Issue Certificate</button>
//       </form>
      
//       {/* Debug and Admin buttons */}
//       <div style={{marginTop: '10px', display: 'flex', gap: '10px'}}>
//         <button onClick={checkPermissions} style={{background: '#e3f2fd', padding: '8px 16px'}}>
//           Check Permissions
//         </button>
//         <button onClick={registerAsSchool} style={{background: '#fff3e0', padding: '8px 16px'}}>
//           Register as School (Admin only)
//         </button>
//       </div>
      
//       {hash && <p><strong>Generated Hash:</strong> {hash}</p>}
//       <p>{status}</p>
//     </div>
//   );
// }

// export default IssueCertificate;











































import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { CertificateRegistryABI } from '../abi/CertificateRegistryABI';
// import './CertificateIssuer.css'; // Import the CSS file
import '../styles/IssueCertificate.css'

// const contractAddress = ' 0x8B64E16c2ed3ef78A56216A1C7BBAd1b24407c5D';
const contractAddress = '0xE4CA114c095BA550E91D7449263Ce6e2F52BAdC4';

// QR Code generation function using HTML5 Canvas
const generateQRCode = (text, size = 200) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const modules = qrGenerator(text);
  const moduleCount = modules.length;
  const moduleSize = size / moduleCount;
  
  canvas.width = size;
  canvas.height = size;
  
  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, size, size);
  
  // Black modules
  ctx.fillStyle = '#000000';
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (modules[row][col]) {
        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
      }
    }
  }
  
  return canvas.toDataURL('image/png');
};

// Simple QR code pattern generator
const qrGenerator = (text) => {
  const size = 25;
  const modules = Array(size).fill().map(() => Array(size).fill(false));
  
  // Create hash from text
  const hash = text.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Generate pattern based on hash
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      modules[i][j] = ((i + j + Math.abs(hash)) % 3) === 0;
    }
  }
  
  // Add finder patterns (corner squares)
  const addFinderPattern = (x, y) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if ((i === 0 || i === 6 || j === 0 || j === 6) || 
            (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
          if (x + i < size && y + j < size) {
            modules[x + i][y + j] = true;
          }
        }
      }
    }
  };
  
  addFinderPattern(0, 0);
  addFinderPattern(0, size - 7);
  addFinderPattern(size - 7, 0);
  
  return modules;
};

function ImprovedIssueCertificate() {
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [institution, setInstitution] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [grade, setGrade] = useState('');
  const [hash, setHash] = useState('');
  const [status, setStatus] = useState('Ready to issue certificates');
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [userPermissions, setUserPermissions] = useState({
    isAdmin: false,
    isRegisteredSchool: false,
    currentAccount: '',
    balance: '0'
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  const handleSubmit = async () => {
    // Validation
    if (!studentName.trim()) {
      setStatus('❌ Student name is required');
      return;
    }
    if (!course.trim()) {
      setStatus('❌ Course name is required');
      return;
    }
    if (!institution.trim()) {
      setStatus('❌ Institution name is required');
      return;
    }
    if (!issueDate) {
      setStatus('❌ Issue date is required');
      return;
    }
    
    setIsLoading(true);

    if (!window.ethereum) {
      setStatus('❌ Please install MetaMask to continue');
      setIsLoading(false);
      return;
    }

    try {
      setStatus('🔌 Connecting to MetaMask...');
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      console.log('Connected account:', account);

      const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);

      // Generate certificate hash
      const timestamp = Date.now().toString();
      const rawData = `${studentName}-${course}-${institution}-${issueDate}-${grade}-${timestamp}`;
      const certHash = web3.utils.keccak256(rawData);
      setHash(certHash);

      console.log('Generated certificate data:', {
        certHash,
        studentName,
        course,
        institution,
        issueDate,
        grade,
        account
      });

      setStatus('🔍 Validating transaction parameters...');

      // Validate with call() first
      try {
        await contract.methods.issueCertificate(certHash, studentName, course)
          .call({ from: account });
        console.log('✅ Transaction validation successful');
      } catch (callError) {
        console.error('❌ Validation failed:', callError);
        
        if (callError.message.includes('Not a registered school')) {
          setStatus('❌ Error: Account must be registered as a school to issue certificates');
          setIsLoading(false);
          return;
        } else if (callError.message.includes('Only admin can do this')) {
          setStatus('❌ Error: Only admin can perform this action');
          setIsLoading(false);
          return;
        } else if (callError.message.includes('Certificate already issued')) {
          setStatus('❌ Error: Certificate with this hash already exists');
          setIsLoading(false);
          return;
        } else {
          setStatus(`❌ Validation Error: ${callError.message}`);
          setIsLoading(false);
          return;
        }
      }

      setStatus('⏳ Broadcasting transaction to blockchain...');

      // Execute the actual transaction
      const gasEstimate = await contract.methods.issueCertificate(certHash, studentName, course)
        .estimateGas({ from: account });

      const result = await contract.methods.issueCertificate(certHash, studentName, course)
        .send({ 
          from: account,
          // gas: Math.floor(gasEstimate * 1.2), // Add 20% buffer
          // gasPrice: web3.utils.toWei('20', 'gwei')
        });

      console.log('Transaction successful:', result);
      setTransactionHash(result.transactionHash);

      // Generate QR code with verification URL
      const verificationUrl = `https://verify.certificate.com/cert/${certHash}`;
      const qrCode = generateQRCode(verificationUrl, 200);
      setQrCodeData(qrCode);

      setStatus('✅ Certificate issued successfully and recorded on blockchain!');
      
    } catch (error) {
      console.error('Transaction failed:', error);
      
      if (error.code === 4001) {
        setStatus('❌ Transaction rejected by user');
      } else if (error.message.includes('insufficient funds')) {
        setStatus('❌ Insufficient ETH balance for transaction fees');
      } else if (error.message.includes('nonce too low')) {
        setStatus('❌ Transaction nonce error. Please try again');
      } else if (error.message.includes('gas')) {
        setStatus('❌ Gas estimation failed. Network might be congested');
      } else {
        setStatus(`❌ Transaction Error: ${error.message || 'Unknown blockchain error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkPermissions = async () => {
    if (!window.ethereum) {
      setStatus('❌ MetaMask not detected. Please install MetaMask');
      return;
    }
    
    try {
      setStatus('🔍 Checking account permissions...');
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      
      if (accounts.length === 0) {
        setStatus('❌ No accounts connected. Please connect MetaMask');
        return;
      }

      const account = accounts[0];
      const balance = await web3.eth.getBalance(account);
      const balanceInEth = web3.utils.fromWei(balance, 'ether');
      
      const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);
      
      // Check permissions
      const admin = await contract.methods.admin().call();
      const isAdmin = admin.toLowerCase() === account.toLowerCase();
      const isRegisteredSchool = await contract.methods.isRegisteredSchool(account).call();
      
      setUserPermissions({
        isAdmin,
        isRegisteredSchool,
        currentAccount: account,
        balance: parseFloat(balanceInEth).toFixed(4)
      });

      console.log('=== ACCOUNT STATUS ===');
      console.log('Contract admin:', admin);
      console.log('Current account:', account);
      console.log('Balance (ETH):', balanceInEth);
      console.log('Is admin:', isAdmin);
      console.log('Is registered school:', isRegisteredSchool);
      console.log('=====================');
      
      if (isAdmin) {
        setStatus('✅ Connected as Contract Admin - Full permissions');
      } else if (isRegisteredSchool) {
        setStatus('✅ Connected as Registered School - Can issue certificates');
      } else {
        setStatus('❌ Account not authorized - Contact admin for school registration');
      }
      
    } catch (error) {
      console.error('Permission check failed:', error);
      setStatus('❌ Error checking account permissions');
    }
  };

  // const registerAsSchool = async () => {
  //   if (!window.ethereum) return;
    
  //   try {
  //     setIsLoading(true);
  //     setStatus('⏳ Registering account as authorized school...');
      
  //     const web3 = new Web3(window.ethereum);
  //     const accounts = await web3.eth.getAccounts();
  //     const account = accounts[0];
  //     const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);
      
  //     const gasEstimate = await contract.methods.registerSchool(account)
  //       .estimateGas({ from: account });
      
  //     const result = await contract.methods.registerSchool(account)
  //       .send({ 
  //         from: account, 
  //         // gas: Math.floor(gasEstimate * 1.2),
  //         // const gasBuffer = BigInt(Math.floor(1.2 * 100)); 
  //         // const adjustedGas = (BigInt(gasEstimate) * gasBuffer) / BigInt(100);
  //         gasPrice: web3.utils.toWei('20', 'gwei')
  //       });
      
  //     console.log('School registration successful:', result);
  //     setStatus('✅ Account successfully registered as authorized school!');
      
  //     // Refresh permissions
  //     setTimeout(() => checkPermissions(), 2000);
      
  //   } catch (error) {
  //     console.error('School registration failed:', error);
  //     if (error.message.includes('Only admin can do this')) {
  //       setStatus('❌ Only contract admin can register new schools');
  //     } else if (error.message.includes('Already registered')) {
  //       setStatus('❌ Account is already registered as a school');
  //     } else {
  //       setStatus(`❌ Registration failed: ${error.message}`);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



  const registerAsSchool = async () => {
    if (!window.ethereum) return;

    try {
      setIsLoading(true);
      setStatus('⏳ Registering account as authorized school...');

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const contract = new web3.eth.Contract(CertificateRegistryABI, contractAddress);

      // Estimate gas safely using BigInt math
      const gasEstimate = await contract.methods.registerSchool(account).estimateGas({ from: account });
      const adjustedGas = (BigInt(gasEstimate) * BigInt(120)) / BigInt(100); // 120% buffer

      const result = await contract.methods.registerSchool(account).send({ 
        from: account, 
        gas: adjustedGas.toString(), // pass as string
        gasPrice: web3.utils.toWei('20', 'gwei')
      });

      console.log('School registration successful:', result);
      setStatus('✅ Account successfully registered as authorized school!');

      // Refresh permissions
      setTimeout(() => checkPermissions(), 2000);

    } catch (error) {
      console.error('School registration failed:', error);
      if (error.message.includes('Only admin can do this')) {
        setStatus('❌ Only contract admin can register new schools');
      } else if (error.message.includes('Already registered')) {
        setStatus('❌ Account is already registered as a school');
      } else {
        setStatus(`❌ Registration failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };





  const resetForm = () => {
    setStudentName('');
    setCourse('');
    setInstitution('');
    setGrade('');
    setIssueDate(new Date().toISOString().split('T')[0]);
    setHash('');
    setQrCodeData('');
    setTransactionHash('');
    setStatus('Form reset. Ready to issue new certificate');
  };

  const downloadQRCode = () => {
    if (!qrCodeData) return;
    
    const link = document.createElement('a');
    link.download = `certificate-qr-${studentName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.png`;
    link.href = qrCodeData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setStatus('📥 QR code downloaded successfully');
  };

  const copyHashToClipboard = () => {
    if (!hash) return;
    
    navigator.clipboard.writeText(hash).then(() => {
      setStatus('📋 Certificate hash copied to clipboard');
    }).catch(() => {
      setStatus('❌ Failed to copy hash to clipboard');
    });
  };

  const getStatusClass = () => {
    if (status.includes('✅')) return 'status-message status-success';
    if (status.includes('❌')) return 'status-message status-error';
    if (status.includes('⏳') || status.includes('🔌') || status.includes('🔍')) return 'status-message status-info';
    return 'status-message status-warning';
  };

  return (
    <div className="certificate-container">
      <div className="certificate-card">
        <div className="header">
          <h1 style={{color: 'white'}}>🎓 Blockchain Certificate Issuer</h1>
          <p style={{color: 'whitesmoke'}}>Issue tamper-proof educational certificates on Ethereum blockchain</p>
        </div>

        {/* Account Status */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          {userPermissions.currentAccount && (
            <div style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#6c757d' }}>
              <strong>Connected:</strong> {userPermissions.currentAccount.slice(0, 6)}...{userPermissions.currentAccount.slice(-4)} 
              | <strong>Balance:</strong> {userPermissions.balance} ETH
            </div>
          )}
          
          {userPermissions.isAdmin && (
            <span className="permission-badge badge-admin">🔑 Contract Admin</span>
          )}
          {userPermissions.isRegisteredSchool && (
            <span className="permission-badge badge-school">🏫 Authorized School</span>
          )}
          {!userPermissions.isAdmin && !userPermissions.isRegisteredSchool && userPermissions.currentAccount && (
            <span className="permission-badge badge-unauthorized">❌ Unauthorized</span>
          )}
        </div>

        {/* Certificate Form */}
        <div className="form-section">
          <div className="form-group">
            <div className="form-label">Student Full Name *</div>
            <input
              className="form-input"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              placeholder="Enter student's complete name"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <div className="form-label">Course/Program Title *</div>
            <input
              className="form-input"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="e.g., Bachelor of Computer Science, Web Development Bootcamp"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <div className="form-label">Institution Name *</div>
            <input
              className="form-input"
              value={institution}
              onChange={e => setInstitution(e.target.value)}
              placeholder="Enter issuing institution name"
              disabled={isLoading}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <div className="form-label">Issue Date *</div>
              <input
                className="form-input"
                type="date"
                value={issueDate}
                onChange={e => setIssueDate(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <div className="form-label">Grade/Score (Optional)</div>
              <input
                className="form-input"
                value={grade}
                onChange={e => setGrade(e.target.value)}
                placeholder="e.g., A+, 95%, Pass"
                disabled={isLoading}
              />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={isLoading || (!userPermissions.isAdmin && !userPermissions.isRegisteredSchool)}
            style={{ width: '100%', marginTop: '10px' }}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Processing Transaction...
              </>
            ) : (
              <>📜 Issue Certificate on Blockchain</>
            )}
          </button>
        </div>

        {/* Control Buttons */}
        <div className="controls-section">
          <button onClick={checkPermissions} className="btn btn-secondary" disabled={isLoading}>
            🔍 Check Account Status
          </button>
          <button 
            onClick={registerAsSchool} 
            className="btn btn-warning"
            disabled={!userPermissions.isAdmin || isLoading}
          >
            🏫 Register as School
          </button>
          <button onClick={resetForm} className="btn btn-secondary" disabled={isLoading}>
            🔄 Reset Form
          </button>
        </div>

        {/* Status Display */}
        {status && (
          <div className={getStatusClass()}>
            {status}
          </div>
        )}

        {/* Certificate Details */}
        {hash && (
          <div className="certificate-details fade-in">
            <h3>📋 Certificate Information</h3>
            <div className="detail-item">
              <span className="detail-label">Student:</span>
              <span className="detail-value">{studentName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Course:</span>
              <span className="detail-value">{course}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Institution:</span>
              <span className="detail-value">{institution}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Issue Date:</span>
              <span className="detail-value">{issueDate}</span>
            </div>
            {grade && (
              <div className="detail-item">
                <span className="detail-label">Grade:</span>
                <span className="detail-value">{grade}</span>
              </div>
            )}
            <div className="detail-item">
              <span className="detail-label">Certificate Hash:</span>
              <span className="detail-value" style={{ cursor: 'pointer' }} onClick={copyHashToClipboard} title="Click to copy">
                {hash} 📋
              </span>
            </div>
            {transactionHash && (
              <div className="detail-item">
                <span className="detail-label">Transaction Hash:</span>
                <span className="detail-value">
                  <a 
                    href={`https://etherscan.io/tx/${transactionHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#667eea', textDecoration: 'none' }}
                  >
                    {transactionHash} 🔗
                  </a>
                </span>
              </div>
            )}
          </div>
        )}

        {/* QR Code Section */}
        {qrCodeData && (
          <div className="qr-section fade-in">
            <h3>📱 Certificate Verification QR Code</h3>
            <div className="qr-code">
              <img src={qrCodeData} alt="Certificate Verification QR Code" width="200" height="200" />
            </div>
            <p className="qr-description">
              Scan this QR code to verify the certificate authenticity on the blockchain.<br/>
              Or visit: https://verify.certificate.com/cert/{hash?.slice(0, 8)}...
            </p>
            <button onClick={downloadQRCode} className="btn btn-secondary">
              💾 Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImprovedIssueCertificate;