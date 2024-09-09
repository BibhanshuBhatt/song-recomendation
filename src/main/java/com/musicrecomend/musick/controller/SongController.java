package com.musicrecomend.musick.controller;

import com.musicrecomend.musick.model.Song;
import com.musicrecomend.musick.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/songs")

public class SongController {
    @Autowired
    private SongRepository songRepository;

    @GetMapping
    public List<Song> getAllSongs(@RequestParam(value = "genre", required = false) String genre) {
        if (genre != null && !genre.isEmpty()) {
            return songRepository.findByGenre(genre);
        }
        return songRepository.findAll();
    }
}
