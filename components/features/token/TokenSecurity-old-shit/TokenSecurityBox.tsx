'use client';
import useNetworkSelector from '@/store/tokenChains/networks';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SourceCodeControl {
  is_open_source: string | null;
  isProxy: string | null;
  externalCall: string | null;
  isHoneypot: string | null;
  honeypot_with_same_creator: string | null;
  isMintable: string | null;
}

interface Restriction {
  isBlacklisted: string | null;
  isWhitelisted: string | null;
  isAntiWhale: string | null;
}

interface TradingControl {
  cannotBuy: string | null;
  cannotSellAll: string | null;
  tradingCooldown: string | null;
  transfer_pausable: string | null;
}

interface OwnershipControl {
  hiddenOwner: string | null;
  canTakeBackOwnership: string | null;
  personalSlippageModifiable: string | null;
  ownerChangeBalance: string | null;
}

interface TaxControl {
  personalSlippageModifiable: string | null;
  slippage_modifiable: string | null;
  gas_abuse: string | null;
}

interface TokenSecurityData {
  sourceCodeControl: SourceCodeControl;
  restriction: Restriction;
  tradingControl: TradingControl;
  ownershipControl: OwnershipControl;
  taxControl: TaxControl;
}

interface Props {
  tokenAddress: string;
}

const Record = ({
  title,
  color,
  transparent,
}: {
  title: string;
  color: 'bg-green-300/70' | 'bg-red-300/70';
  transparent: 'openSource' | 'proxy' | null;
}) => {


  const renderTitle = (title: string) => {
    const titles: { [key: string]: string } = {
      is_open_source: 'Open Source',
      isProxy: 'Proxy',
      externalCall: 'External Call',
      isHoneypot: 'Honey Pot',
      honeypot_with_same_creator: 'Honey Pot With Same Creator',
      isMintable: 'Minitable',
      isBlacklisted: 'Blacklisted',
      isWhitelisted: 'Whitelisted',
      isAntiWhale: 'AntiWhale',
      cannotBuy: 'Cannot Buy',
      cannotSellAll: 'Cannot Sell All',
      tradingCooldown: 'Trading Cool down',
      transfer_pausable: 'Transfer Pausable',
      hiddenOwner: 'Hidden Owner',
      canTakeBackOwnership: 'Can Take Back Ownership',
      personalSlippageModifiable: 'Personal Slippage Modifiable',
      ownerChangeBalance: 'Owner Change Balance',
      slippage_modifiable: 'Slippage Modifiable',
      gas_abuse: 'Gas Abuse'
    }
    return titles[title]
  }

  return (

    <p
      className={clsx('p-4 rounded-sm min-w-[120px] w-[120px] h-[80px] flex items-center justify-center text-sm', {
        'bg-red-300': transparent === 'proxy',
        'bg-gray-200': transparent === 'openSource',
        [color]: !transparent
      })}
    >
      {renderTitle(title)}
    </p >
  );
}

export default function TokenSecurityBox({ tokenAddress }: Props) {
  const params = useParams();

  const [data, setData] = useState<TokenSecurityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBoxTransparent, setIsBoxTransparent] = useState<'openSource' | 'proxy' | null>(null);
  const { selectedChain } = useNetworkSelector();

  useEffect(() => {
    fetch(
      `https://onchain.dextrading.com/security-data?chainId=${params?.params[0]}&baseCurrency=${tokenAddress}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setData(null);
        } else {
          setData(json.tokenSecurity);
          setIsBoxTransparent(
            json.tokenSecurity.sourceCodeControl.is_open_source === 'no'
              ? 'openSource'
              : json.tokenSecurity.sourceCodeControl.isProxy === 'yes'
                ? 'proxy'
                : null
          );
        }
      })
      .catch((error) => {
        console.error('Error fetching security data:', error);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [selectedChain.id, tokenAddress]);

  if (loading)
    return (
      <div className="w-full h-[700px] flex justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
      </div>
    );

  if (!data) return null;

  const renderRecords = (title: string, records: any | Record<string, string | null>) => (

    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row items-start md:items-center  gap-5 ">
        <div className="font-medium min-w-[160px] w-[160px] break-words">{title}</div>
        <div className='overflow-x-scroll w-full flex items-center gap-5 '>
          {Object.entries(records).map(([key, value]) => (
            <Record
              key={key}
              title={key}
              transparent={isBoxTransparent}
              color={title !== 'Source Code Control' && value !== 'no' ? 'bg-red-300/70' : 'bg-green-300/70'}
            />
          ))}
        </div>
      </div>
    </div>

  );

  return (
    <div
      className={`rounded-md ${data.sourceCodeControl.is_open_source === 'no'
        ? '/30'
        : data.sourceCodeControl.isProxy === 'yes'
          ? 'bg-red-300'
          : '/10'
        }`}
    >
      <h2 className="mb-8 mt-4  flex flex-col gap-2 break-words">
        <span className="text-xl font-semibold">Security Box</span>
        <span className="text-lg font-medium text-base-content/80">
          {data.sourceCodeControl.is_open_source === 'no'
            ? 'Contract is not Safe'
            : data.sourceCodeControl.isProxy === 'yes'
              ? 'Contract Proxy'
              : ''}
        </span>
      </h2>
      <div className="flex flex-col gap-5 px-5">
        {renderRecords('Source Code Control', data.sourceCodeControl)}
        {renderRecords('Restriction', data.restriction)}
        {renderRecords('Trading Control', data.tradingControl)}
        {renderRecords('Ownership Control', data.ownershipControl)}
        {renderRecords('Tax Control', data.taxControl)}
      </div>
    </div>
  );
}
