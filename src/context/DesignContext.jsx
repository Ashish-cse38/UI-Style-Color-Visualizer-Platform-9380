import React, { createContext, useContext, useState, useEffect } from 'react';

const DesignContext = createContext();

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};

export const DesignProvider = ({ children }) => {
  const [uiStyle, setUiStyle] = useState('Material Design');
  const [colorScheme, setColorScheme] = useState('Complementary');
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  const uiStyles = [
    'Skeuomorphism',
    'Neumorphism (Soft UI)',
    'Minimalism',
    'Flat Design',
    'Material Design',
    'Glassmorphism',
    'Brutalism',
    'Claymorphism',
    'Retro/Vaporwave',
    'Cyberpunk',
    'Swiss/International',
    'Dark Mode',
    'Bauhaus-inspired',
    'Corporate Memphis',
    'Aurora/Gradient',
    'Retro Futurism',
    'Playful/Whimsical',
    'Biophilic Design',
    'Anti-Design',
    'Skeuominimalism'
  ];

  const colorSchemes = [
    'Monochrome',
    'Analogous',
    'Complementary',
    'Split-Complementary',
    'Triadic',
    'Tetradic/Rectangle',
    'Square',
    'Duotone',
    'Gradient/Polychrome',
    'Achromatic',
    'Pastel Palette',
    'Muted/Desaturated Palette',
    'Neutral Palette',
    'Vivid/High Contrast',
    'Primary',
    'Secondary',
    'Warm Palette',
    'Cool Palette',
    'Neon',
    'Color Blocking',
    'Solarized Light',
    'Solarized Dark',
    'Nord',
    'Dracula'
  ];

  const getDesignClasses = () => {
    const styleClasses = getStyleClasses(uiStyle);
    const colorClasses = getColorClasses(colorScheme);
    return `${styleClasses} ${colorClasses}`;
  };

  const getStyleClasses = (style) => {
    switch (style) {
      case 'Skeuomorphism':
        return 'skeuomorphism-style';
      case 'Neumorphism (Soft UI)':
        return 'neumorphism-style';
      case 'Minimalism':
        return 'minimalism-style';
      case 'Flat Design':
        return 'flat-design-style';
      case 'Material Design':
        return 'material-design-style';
      case 'Glassmorphism':
        return 'glassmorphism-style';
      case 'Brutalism':
        return 'brutalism-style';
      case 'Claymorphism':
        return 'claymorphism-style';
      case 'Retro/Vaporwave':
        return 'retro-vaporwave-style';
      case 'Cyberpunk':
        return 'cyberpunk-style';
      case 'Swiss/International':
        return 'swiss-style';
      case 'Dark Mode':
        return 'dark-mode-style';
      case 'Bauhaus-inspired':
        return 'bauhaus-style';
      case 'Corporate Memphis':
        return 'corporate-memphis-style';
      case 'Aurora/Gradient':
        return 'aurora-style';
      case 'Retro Futurism':
        return 'retro-futurism-style';
      case 'Playful/Whimsical':
        return 'playful-style';
      case 'Biophilic Design':
        return 'biophilic-style';
      case 'Anti-Design':
        return 'anti-design-style';
      case 'Skeuominimalism':
        return 'skeuominimalism-style';
      default:
        return 'material-design-style';
    }
  };

  const getColorClasses = (scheme) => {
    switch (scheme) {
      case 'Monochrome':
        return 'color-monochrome';
      case 'Analogous':
        return 'color-analogous';
      case 'Complementary':
        return 'color-complementary';
      case 'Split-Complementary':
        return 'color-split-complementary';
      case 'Triadic':
        return 'color-triadic';
      case 'Tetradic/Rectangle':
        return 'color-tetradic';
      case 'Square':
        return 'color-square';
      case 'Duotone':
        return 'color-duotone';
      case 'Gradient/Polychrome':
        return 'color-gradient';
      case 'Achromatic':
        return 'color-achromatic';
      case 'Pastel Palette':
        return 'color-pastel';
      case 'Muted/Desaturated Palette':
        return 'color-muted';
      case 'Neutral Palette':
        return 'color-neutral';
      case 'Vivid/High Contrast':
        return 'color-vivid';
      case 'Primary':
        return 'color-primary';
      case 'Secondary':
        return 'color-secondary';
      case 'Warm Palette':
        return 'color-warm';
      case 'Cool Palette':
        return 'color-cool';
      case 'Neon':
        return 'color-neon';
      case 'Color Blocking':
        return 'color-blocking';
      case 'Solarized Light':
        return 'color-solarized-light';
      case 'Solarized Dark':
        return 'color-solarized-dark';
      case 'Nord':
        return 'color-nord';
      case 'Dracula':
        return 'color-dracula';
      default:
        return 'color-complementary';
    }
  };

  // Apply body classes for global styling
  useEffect(() => {
    const bodyClasses = getDesignClasses();
    document.body.className = bodyClasses;
    return () => {
      document.body.className = '';
    };
  }, [uiStyle, colorScheme]);

  return (
    <DesignContext.Provider
      value={{
        uiStyle,
        setUiStyle,
        colorScheme,
        setColorScheme,
        uiStyles,
        colorSchemes,
        getDesignClasses,
        isControlsOpen,
        setIsControlsOpen
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};