import { useState } from 'react';
import { NFTModel } from '~/app/users/types';
import styled from '@emotion/styled'
import Button from './Button';
import { saveDefaultPiece } from '~/app/api/users';

interface NftCarouselProps {
    nfts: NFTModel[];
  }

export default function NftCarousel({ nfts }: NftCarouselProps) {
  const [currentNftIndex, setCurrentNftIndex] = useState(0);

  const prevNft = () => {
    setCurrentNftIndex((prevIndex) =>
      prevIndex === 0 ? nfts.length - 1 : prevIndex - 1
    );
  };

  const nextNft = () => {
    setCurrentNftIndex((prevIndex) =>
      prevIndex === nfts.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!nfts || nfts.length === 0) {
    return <p>No NFTs available.</p>;
  }

  const saveHandler = async () => {
    const res = await saveDefaultPiece(nfts[currentNftIndex].name);
    
    if (res.status === 200) {
        alert("변경 성공!")
    } else {
        alert("변경 실패")
    }
  }

  return (
    <div style={{textAlign: 'center'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={prevNft} style={{fontSize:"5rem"}}>{'<'}</button>
        <Slide>
            <NftCard  style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            border: '1px solid #ccc', 
            borderRadius: '10px', 
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            transform: `rotateY(${currentNftIndex * 360}deg)`
            }}>
                <h2>{nfts[currentNftIndex].name}</h2>
                <img src={nfts[currentNftIndex].image || ''} alt={nfts[currentNftIndex].name} style={{ maxWidth: '200px', maxHeight:'200px'}} />
                <p>설명</p>
                <p>{nfts[currentNftIndex].description || ''}</p>
            </NftCard >
            </Slide>
        <button onClick={nextNft} style={{fontSize:"5rem"}}>{'>'}</button>
        </div>
        <Button size={"sm"} onClick={saveHandler}>기본으로 저장</Button>
    </div>
  );
}

const Slide = styled.div`
  transition: transform 1s ease-in-out;
`;

const NftCard = styled.div`
  display: flex;
  flexDirection: column;
  alignItems: center;
  border: 1px solid #ccc;
  borderRadius: 10px;
  padding: 20px;
  boxShadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: transform 1s ease-in-out; // 애니메이션 효과 적용
`;