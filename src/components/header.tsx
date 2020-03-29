import * as React from 'react';
import { Link } from 'react-router-dom';
import { homeUrl } from 'routes';

export const Header = () => (
  <header className="bg-pink-600 text-gray-100">
    <div className="max-w-6xl mx-auto py-2 px-4">
      <Link className="text-xl" to={homeUrl}>
        Testing Hub
      </Link>
    </div>
  </header>
);
