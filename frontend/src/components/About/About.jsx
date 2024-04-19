import React from 'react'

export default function About() {
  return (
      <div className="py-16 bg-white">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-5/12">
                      <img
                          src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                          alt="image"
                      />
                  </div>
                  <div className="md:7/12 lg:w-6/12">
                      <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                      Discover the Story Behind Event-Handler
                      </h2>
                      <p className="mt-6 text-gray-600">
                      Welcome to Event-Handler, where we believe in connecting people with memorable experiences. Our platform is designed to bring together event organizers, attendees, and sponsors, creating a vibrant community centered around shared interests and passions.
                      </p>
                      <p className="mt-4 text-gray-600">
                      At Event-Handler, we strive to make event planning and participation seamless and enjoyable for everyone involved. Whether you're an event organizer looking to reach a wider audience, an attendee searching for the next exciting experience, or a sponsor seeking meaningful engagement opportunities, we've got you covered.
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );
}