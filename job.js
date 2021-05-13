function makeJobSchema(job) {
    const desc = stripHTML(job.description)
    return {
        // schema truncated for brevity
        '@context': 'http://schema.org',
        '@type': 'JobPosting',
        datePosted: job.postedAt,
        description: desc,
        title: job.title,
        image: job.company.logo,
        workHours: 'Flexible',
        validThrough: addDaysToDate(job.postedAt, 60),
        hiringOrganization: {
            '@type': 'Organization',
            name: job.company.name,
            sameAs: job.company.website || null,
            logo: job.company.logo,
        },
    }
}