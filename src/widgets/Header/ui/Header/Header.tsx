import clsx from 'clsx';
import { Button, ButtonSize } from '@/shared/ui/Button/Button';
import { Board } from '@/shared/ui/Board/Board';
import { useWeb3 } from '@/entities/Web3';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
    const { className } = props;
    const { connectAccount, address, disconnectAccount, currentEpoch, balance } = useWeb3();

    const connectClickHandler = () => {
        if (!address) {
            connectAccount?.()
        } else {
            disconnectAccount?.()
        }
    }
    return (
        <header className={clsx('wrapper', [className])}>
            <Board className='flex items-center justify-end gap-4'> 
                {
                    address && (
                    <div className='flex gap-2'>
                        {currentEpoch && <p className='p-3 bg-blue-200 rounded-xl'>Current Epoch: <span className='font-bold'>{currentEpoch}</span></p>}
                        <p className='p-3 bg-blue-200 rounded-xl'>account: <span className='font-bold'>{address}</span></p>
                        <p className='p-3 bg-blue-200 rounded-xl'>balance: <span className='font-bold'>{balance}</span></p>
                    </div>
                    )
                }
                <Button 
                    size={ButtonSize.LARGE}
                    onClick={connectClickHandler}
                >
                    {
                        !address ? 'Connect Wallet' : 'Exit' 
                    }
                </Button>
            </Board>
        </header>
    );
}