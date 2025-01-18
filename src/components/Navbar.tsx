'use client';

import { FC } from 'react';
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import Cookies from 'js-cookie';
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoggedIn = !!Cookies.get('token');

  const handleLogout = (): void => {
    Cookies.remove('token');
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-6">
        {/* Left section with logo */}
        <Link 
          href={isLoggedIn ? '/bookings' : '/'} 
          className="font-bold text-xl"
        >
          TrainSeats
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && (
              <Link href="/bookings">
                <Button variant={pathname === '/bookings' ? 'default' : 'ghost'}>
                  Book Seats
                </Button>
              </Link>
            )}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant={pathname === '/auth/login' ? 'default' : 'ghost'}>
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant={pathname === '/auth/register' ? 'default' : 'ghost'}>
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          <ModeToggle />

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col gap-4 pt-10">
                {isLoggedIn ? (
                  <>
                    <Link href="/bookings">
                      <Button variant={pathname === '/bookings' ? 'default' : 'ghost'}>
                        Book Seats
                      </Button>
                    </Link>
                    <Button variant="ghost" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant={pathname === '/auth/login' ? 'default' : 'ghost'}>
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button variant={pathname === '/auth/register' ? 'default' : 'ghost'}>
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 