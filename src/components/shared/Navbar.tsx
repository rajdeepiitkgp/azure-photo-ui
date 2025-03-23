import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useMediaQuery } from '@/hooks/MediaHook';
import { ThemeToggle } from './ThemeToggle';
import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';
import { NavLinks } from '@/providers/RouterProvider';

const Navbar = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const renderLinks = () => (
    <nav className='flex flex-col gap-4 md:flex-row md:gap-6'>
      {NavLinks.filter((navlink) => navlink.isNavLink).map((link) => (
        <NavLink
          key={link.label}
          to={link.href}
          className={({ isActive }) =>
            cn(
              'text-sm font-medium transition-colors hover:text-foreground',
              isActive ? 'text-foreground' : 'text-muted-foreground'
            )
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <header className='w-full border-b'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6'>
        {isDesktop ? (
          <div className='flex items-center gap-6'>{renderLinks()}</div>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-64'>
              <div className='flex flex-col gap-6 p-4'>{renderLinks()}</div>
            </SheetContent>
          </Sheet>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;

