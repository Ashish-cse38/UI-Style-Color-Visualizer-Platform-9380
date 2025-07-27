import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useDesign} from '../context/DesignContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiSettings, FiX, FiPalette, FiLayout, FiRefreshCw} = FiIcons;

const DesignControls = () => {
  const {
    uiStyle,
    setUiStyle,
    colorScheme,
    setColorScheme,
    uiStyles,
    colorSchemes,
    isControlsOpen,
    setIsControlsOpen
  } = useDesign();

  const handleRandomize = () => {
    const randomStyle = uiStyles[Math.floor(Math.random() * uiStyles.length)];
    const randomColor = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    setUiStyle(randomStyle);
    setColorScheme(randomColor);
  };

  const getStyleDescription = (style) => {
    const descriptions = {
      'Skeuomorphism': 'Real-world textures and depth',
      'Neumorphism (Soft UI)': 'Soft, extruded surfaces',
      'Minimalism': 'Clean, essential elements only',
      'Flat Design': 'Bold colors, no depth effects',
      'Material Design': 'Realistic lighting with bold motion',
      'Glassmorphism': 'Frosted glass transparency effect',
      'Brutalism': 'Raw, deliberately confrontational design',
      'Claymorphism': 'Soft, 3D clay-like vibrant elements',
      'Retro/Vaporwave': '80s/90s nostalgia with neon colors and grids',
      'Cyberpunk': 'Dark, futuristic aesthetic with neon accents',
      'Swiss/International': 'Grid-based, functionalist design with strict alignment',
      'Dark Mode': 'Low-light optimized interfaces',
      'Bauhaus-inspired': 'Primary shapes, colors, and geometric forms',
      'Corporate Memphis': 'Flat, diverse illustrations with rounded shapes',
      'Aurora/Gradient': 'Multi-color gradients as primary visual element'
    };
    return descriptions[style] || 'Modern design approach';
  };

  const getColorDescription = (color) => {
    const descriptions = {
      'Monochrome': 'Black, white, and grays',
      'Neon': 'Bright, electric colors',
      'Dracula': 'Dark theme with purple accents',
      'Pastel Palette': 'Soft, muted colors',
      'Complementary': 'Opposite colors on color wheel',
      'Primary': 'Red, blue, and yellow',
      'Secondary': 'Green, orange, and purple',
      'Warm Palette': 'Reds, oranges, yellows',
      'Cool Palette': 'Blues, greens, violets',
      'Vivid/High Contrast': 'Bold, saturated colors'
    };
    return descriptions[color] || 'Harmonious color scheme';
  };

  return (
    <>
      <motion.button
        onClick={() => setIsControlsOpen(!isControlsOpen)}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
      >
        <SafeIcon icon={isControlsOpen ? FiX : FiSettings} className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isControlsOpen && (
          <>
            {/* Backdrop - only closes when clicking directly on it */}
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="fixed inset-0 bg-black bg-opacity-25 z-30"
              onClick={() => setIsControlsOpen(false)}
            />

            {/* Panel - stops event propagation to prevent closing */}
            <motion.div
              initial={{opacity: 0, x: 400}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: 400}}
              transition={{type: "spring", damping: 25, stiffness: 300}}
              className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-40 overflow-y-auto"
              style={{maxHeight: '100vh'}}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Design Controls</h2>
                  <button
                    onClick={handleRandomize}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                    <span className="text-sm">Random</span>
                  </button>
                </div>

                {/* UI Style Section */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <SafeIcon icon={FiLayout} className="w-5 h-5 mr-2 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-700">UI Style</h3>
                  </div>
                  <div className="relative z-50">
                    <select
                      value={uiStyle}
                      onChange={(e) => setUiStyle(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                    >
                      {uiStyles.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    {getStyleDescription(uiStyle)}
                  </p>
                </div>

                {/* Color Scheme Section */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <SafeIcon icon={FiPalette} className="w-5 h-5 mr-2 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-700">Color Scheme</h3>
                  </div>
                  <div className="relative z-50">
                    <select
                      value={colorScheme}
                      onChange={(e) => setColorScheme(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                    >
                      {colorSchemes.map((scheme) => (
                        <option key={scheme} value={scheme}>
                          {scheme}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    {getColorDescription(colorScheme)}
                  </p>
                </div>

                {/* Popular Combinations */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Popular Combinations</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {[
                      {style: 'Skeuomorphism', color: 'Monochrome', name: 'Classic Leather'},
                      {style: 'Neumorphism (Soft UI)', color: 'Pastel Palette', name: 'Soft Modern'},
                      {style: 'Minimalism', color: 'Monochrome', name: 'Pure Clean'},
                      {style: 'Flat Design', color: 'Vivid/High Contrast', name: 'Bold & Bright'},
                      {style: 'Material Design', color: 'Complementary', name: 'Google Style'},
                      {style: 'Glassmorphism', color: 'Neon', name: 'Cyber Glass'},
                      {style: 'Brutalism', color: 'Neon', name: 'Punk Aesthetic'},
                      {style: 'Claymorphism', color: 'Pastel Palette', name: 'Soft Clay'},
                      {style: 'Retro/Vaporwave', color: 'Neon', name: 'Neon Nostalgia'},
                      {style: 'Cyberpunk', color: 'Neon', name: 'Future Noir'},
                      {style: 'Swiss/International', color: 'Monochrome', name: 'Grid Master'},
                      {style: 'Dark Mode', color: 'Dracula', name: 'Night Vision'},
                      {style: 'Bauhaus-inspired', color: 'Primary', name: 'Primary Shapes'},
                      {style: 'Corporate Memphis', color: 'Pastel Palette', name: 'Friendly Figures'},
                      {style: 'Aurora/Gradient', color: 'Gradient/Polychrome', name: 'Color Flow'}
                    ].map((combo, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setUiStyle(combo.style);
                          setColorScheme(combo.color);
                        }}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className="font-medium text-gray-800">{combo.name}</div>
                        <div className="text-sm text-gray-600">
                          {combo.style} + {combo.color}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Selection Summary */}
                <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">Current Selection:</p>
                  <p><strong>Style:</strong> {uiStyle}</p>
                  <p><strong>Colors:</strong> {colorScheme}</p>
                  <div className="mt-3 text-xs text-gray-500">
                    💡 Try different combinations to see dramatic visual changes!
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DesignControls;