/**
 * Destination Autocomplete Component
 * Real-time search suggestions with keyboard and mouse navigation
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { searchDestinations, type Destination } from '@/lib/data/destinations';
import { MapPin, Navigation, X } from "lucide-react";

export interface DestinationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (destination: Destination) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  showCoordinatesOnSelect?: boolean;
}

export function DestinationAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = 'Search destinations...',
  label,
  id,
  className = '',
  required = false,
  disabled = false,
  showCoordinatesOnSelect = false,
}: DestinationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Destination[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const suggestionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Search for destinations when input changes
  useEffect(() => {
    if (value.trim().length >= 2) {
      const results = searchDestinations(value, 8);
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const handleSelectDestination = useCallback(
    (destination: Destination) => {
      if (showCoordinatesOnSelect) {
        onChange(`${destination.coordinates.lat}, ${destination.coordinates.lng}`);
      } else {
        onChange(destination.name);
      }
      
      if (onSelect) {
        onSelect(destination);
      }
      
      setIsOpen(false);
      setSelectedIndex(-1);
      inputRef.current?.blur();
    },
    [onChange, onSelect, showCoordinatesOnSelect]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectDestination(suggestions[selectedIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        break;

      case 'Tab':
        setIsOpen(false);
        break;

      default:
        break;
    }
  };

  const handleClear = () => {
    onChange('');
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (value.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full pl-10 pr-10 py-2 
            border border-gray-300 dark:border-gray-600 
            rounded-lg
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
          `}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={`${id}-suggestions`}
          aria-activedescendant={
            selectedIndex >= 0 ? `${id}-suggestion-${selectedIndex}` : undefined
          }
        />

        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            tabIndex={-1}
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          id={`${id}-suggestions`}
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-64 overflow-auto"
        >
          {suggestions.map((destination, index) => (
            <div
              key={destination.id}
              ref={(el) => {
                suggestionRefs.current[index] = el;
              }}
              id={`${id}-suggestion-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={`
                px-4 py-3 cursor-pointer transition-colors
                ${
                  index === selectedIndex
                    ? 'bg-blue-50 dark:bg-blue-900/30'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }
                ${index !== suggestions.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}
              `}
              onMouseDown={(e) => {
                // Prevent input blur
                e.preventDefault();
              }}
              onClick={() => handleSelectDestination(destination)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${index === selectedIndex ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                  <Navigation className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {destination.city}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {destination.country}
                  </div>
                  
                  {destination.airport && (
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {destination.airport} • {destination.region}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Helper text */}
      {isFocused && value.trim().length < 2 && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Type at least 2 characters to see suggestions
        </p>
      )}

      {isFocused && value.trim().length >= 2 && suggestions.length === 0 && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          No destinations found. Try a different search.
        </p>
      )}
    </div>
  );
}
